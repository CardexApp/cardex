from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User
from rest_framework import generics, status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from rest_framework.views import APIView
from django.conf import settings
from .models import Order, OrderItem, Product, User

from .models import Product, CarType, Order, Cart, CartItem, Review, OrderItem, Make, CarType
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings
from .serializers import (
    ProductSerializer,
    CarTypeSerializer,
    OrderSerializer,
    RegisterSerializer,
    CartSerializer,
    AddToCartSerializer,
    CartItemSerializer,
    ReviewCreateSerializer,
    ReviewSerializer,
    AdminRegisterSerializer,
    ProductAdminSerializer,
    UserProfileUpdateSerializer,
    PasswordChangeSerializer,
    UserProfileSerializer,
    AdminUserSerializer,
    ReturnRequestSerializer,
    ContactSerializer,
    CustomTokenObtainPairSerializer,
    MakeSerializer,
    CarTypeSerializer,
    AdminOrderUpdateSerializer,
)
from django.utils import timezone
from django.db.models import Sum, Count, F, FloatField
from datetime import timedelta, datetime

from .permissions import IsStaff  # import the custom permission



# /api/register/ POST


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class UserProfileUpdateView(generics.UpdateAPIView):
    serializer_class = UserProfileUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class PasswordChangeView(generics.UpdateAPIView):
    serializer_class = PasswordChangeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        first_name = request.user.first_name or "User"

        return Response(
            {"message": f"{first_name}, your password has been changed successfully."},
            status=status.HTTP_200_OK
        )


# /api/products/ GET


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# /api/products/<id>/ GET


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'

# /api/car-types/ GET


class CarTypeListView(generics.ListAPIView):
    queryset = CarType.objects.all()
    serializer_class = CarTypeSerializer

# /api/products/search/ GET


class ProductSearchView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = {
        'price': ['exact', 'gte', 'lte'],
        'model_year': ['exact', 'gte', 'lte'],
        'make__name': ['exact'],
        'car_type__name': ['exact'],
        'transmission': ['exact'],
    }
    search_fields = ['name', 'description', 'mileage',
                     'model_year', 'price', 'car_type__name', 'transmission']
    ordering_fields = ['price', 'model_year']


class ReviewCreateView(generics.CreateAPIView):
    serializer_class = ReviewCreateSerializer
    permission_classes = [IsAuthenticated]

class ProductReviewListView(generics.ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        product_id = self.kwargs['id']
        return Review.objects.filter(product_id=product_id)

# # /api/guest-checkout/ POST


# class GuestCheckoutView(generics.CreateAPIView):
#     serializer_class = OrderSerializer

# View to handle user checkout
# /api/checkout/ POST
class CheckoutView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        return Response({
            "message": "Order placed successfully",
            "order": OrderSerializer(order).data
        }, status=status.HTTP_201_CREATED)




# View to retrieve the user's order
# /api/order/ GET
class OrderView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')
    
class ReturnRequestView(generics.UpdateAPIView):
    serializer_class = ReturnRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only allow updating the user's own orders
        return Order.objects.filter(user=self.request.user)


# View to retrieve the user's cart


class UserCartView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart

# View to add product to cart


class AddToCartView(generics.CreateAPIView):
    serializer_class = AddToCartSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        cart_item = serializer.save()
        return Response({
            "message": "Item added to cart successfully",
            "cart_item": CartItemSerializer(cart_item).data
        }, status=status.HTTP_201_CREATED)

# View to remove a product from cart


class RemoveFromCartView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        product_id = self.kwargs.get('product_id')
        try:
            cart = Cart.objects.get(user=request.user)
            item = CartItem.objects.get(cart=cart, product_id=product_id)
            item.delete()
            return Response({"message": "Item removed from cart."}, status=status.HTTP_200_OK)
        except (Cart.DoesNotExist, CartItem.DoesNotExist):
            return Response({"error": "Item not found in cart."}, status=status.HTTP_404_NOT_FOUND)
        

# All viewsets for admin

# class StandardResultsSetPagination(pagination.LimitOffsetPagination):
#     default_limit = 20
#     max_limit = 100

class AdminRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = AdminRegisterSerializer
    permission_classes = [IsAuthenticated, IsStaff]  # only superusers and Admin can register admins


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductAdminSerializer
    permission_classes = [permissions.IsAdminUser]  # only admin can access
    # pagination_class = StandardResultsSetPagination
    filterset_fields = ['condition', 'fuel_type']

class MakeViewSet(viewsets.ModelViewSet):
    queryset = Make.objects.all()
    serializer_class = MakeSerializer
    permission_classes = [permissions.IsAdminUser]  # only admin can access
    # pagination_class = StandardResultsSetPagination

class CarTypeViewSet(viewsets.ModelViewSet):
    queryset = CarType.objects.all()
    serializer_class = CarTypeSerializer
    permission_classes = [permissions.IsAdminUser]  # only admin can access
    # pagination_class = StandardResultsSetPagination

# class OrderViewSet(viewsets.ModelViewSet):
#     queryset = Order.objects.all()
#     serializer_class = OrderSerializer
#     permission_classes = [permissions.IsAdminUser]
#     # pagination_class = StandardResultsSetPagination
#     # filterset_fields = ['status', 'user', 'product']


class AdminOrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().select_related('user', 'address').order_by('created_at')
    permission_classes = [permissions.IsAdminUser]

    def get_serializer_class(self):
        # Use admin serializer only for admin PATCH/PUT
        if self.action in ['partial_update', 'update']:
            return AdminOrderUpdateSerializer
        return OrderSerializer

    def partial_update(self, request, *args, **kwargs):
        """ Admin updating order status, e.g., from processing → dispatched, etc. """
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Order updated successfully", "order": OrderSerializer(instance).data})

    def destroy(self, request, *args, **kwargs):
        """ Admin deleting an order (if needed) """
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Order deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = AdminUserSerializer
    permission_classes = [permissions.IsAdminUser]
    # pagination_class = StandardResultsSetPaginationS


class ContactUsView(generics.GenericAPIView):
    serializer_class = ContactSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data

            send_mail(
                subject=f"New Contact from {data['name']}, phone number: {data['phone']}",
                message=f"Email: {data['email']}\n\nMessage:\n{data['message']}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=['cardexbackend@gmail.com'],
                fail_silently=False,
            )
            return Response({"message": "Message sent"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# views.py

class AdminAnalyticsView(APIView):
    permission_classes = [permissions.IsAdminUser]  # only admin can access this view

    def get(self, request):
        now = timezone.now()
        last_30_days = now - timedelta(days=30)

        # Total Revenue: sum of product price * quantity
        revenue = OrderItem.objects.annotate(
            item_total=F('product__price') * F('quantity')
        ).aggregate(total=Sum('item_total'))['total'] or 0

        # Total Orders
        total_orders = Order.objects.count()

        # Pending Orders (processing or dispatched)
        pending_orders = Order.objects.filter(status__in=['processing', 'dispatched']).count()

        # Active Users (placed at least 1 order in last 30 days)
        active_users = Order.objects.filter(created_at__gte=last_30_days).values('user').distinct().count()

        # New Users in the last 30 days
        new_users = User.objects.filter(date_joined__gte=last_30_days).count()

        # Return Rate (% of orders that are return_* out of total orders)
        return_orders = Order.objects.filter(status__startswith='return_').count()
        return_rate = round((return_orders / total_orders) * 100, 1) if total_orders else 0

        # Top Products by units sold
        top_products = (
            OrderItem.objects
            .values('product__name')
            .annotate(units_sold=Sum('quantity'))
            .order_by('-units_sold')[:5]
        )

        data = {
            "totalRevenue": float(revenue),
            "totalOrders": total_orders,
            "pendingOrders": pending_orders,
            "activeUsers": active_users,
            "newUsers": new_users,
            "returnRate": return_rate,
            "topProducts": list(top_products)
        }

        return Response(data)
    


class AdminDashboardStatsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        now = timezone.now()
        last_30_days = now - timedelta(days=30)

        # Summary stats
        revenue = OrderItem.objects.aggregate(
        total_revenue=Sum(F('product__price') * F('quantity'), output_field=FloatField())
        )['total_revenue'] or 0

        total_orders = Order.objects.count()
        pending_orders = Order.objects.filter(status__in=['processing', 'dispatched']).count()
        active_users = Order.objects.filter(created_at__gte=last_30_days).values('user').distinct().count()
        new_users = User.objects.filter(date_joined__gte=last_30_days).count()
        return_orders = Order.objects.filter(status__startswith='return_').count()

        return_rate = round((return_orders / total_orders) * 100, 1) if total_orders else 0

        # Top products
        top_products = (
            OrderItem.objects
            .values(name=F('product__name'))
            .annotate(unitsSold=Sum('quantity'))
            .order_by('-unitsSold')[:5]
        )

        # Orders & revenue by month (last 6 months)
        months = []
        orders_by_month = []
        revenue_by_month = []
        for i in range(5, -1, -1):
            month = timezone.make_aware(datetime.combine(
            (now - timedelta(days=30*i)).date().replace(day=1),
            datetime.min.time()
        ))
            next_month = timezone.make_aware(datetime.combine(
            (month + timedelta(days=32)).date().replace(day=1),
            datetime.min.time()
        ))
            months.append(month.strftime('%B'))

            monthly_orders = Order.objects.filter(created_at__gte=month, created_at__lt=next_month).count()
            monthly_revenue = OrderItem.objects.filter(
                order__created_at__gte=month,
                order__created_at__lt=next_month
            ).aggregate(
            total=Sum(F('product__price') * F('quantity'), output_field=FloatField())
            )['total'] or 0

            orders_by_month.append(monthly_orders)
            revenue_by_month.append(float(monthly_revenue))

        # Weekly sales (past 7 days)
        weekly_sales = []
        for i in range(6, -1, -1):
            day = now.date() - timedelta(days=i)
            sales = Order.objects.filter(created_at__date=day).count()
            weekly_sales.append({"day": day.strftime('%A'), "orders": sales})

        # User growth (last 6 months)
        user_growth = []
        for i in range(5, -1, -1):
            month = timezone.make_aware(datetime.combine(
            (now - timedelta(days=30*i)).date().replace(day=1),
            datetime.min.time()
            ))  

            next_month = timezone.make_aware(datetime.combine(
            (month + timedelta(days=32)).date().replace(day=1),
            datetime.min.time()
        ))
            count = User.objects.filter(date_joined__gte=month, date_joined__lt=next_month).count()
            user_growth.append({"month": month.strftime('%B'), "count": count})

        # Recent orders
        recent_orders = (
            Order.objects.select_related('user')
            .order_by('-created_at')[:5]
            .values('id', 'user__first_name', 'user__last_name', 'status', 'created_at')
        )

        # Inventory summary
        inventory_summary = list(
            Product.objects.annotate(
                stockStatus=F('quantity')
            ).values('name', 'quantity')
        )

        data = {
            "summary": {
                "totalRevenue": float(revenue),
                "totalOrders": total_orders,
                "pendingOrders": pending_orders,
                "activeUsers": active_users,
                "newUsers": new_users,
                "returnRate": return_rate,
            },
            "topProducts": list(top_products),
            "ordersByMonth": orders_by_month,
            "revenueByMonth": revenue_by_month,
            "weeklySales": weekly_sales,
            "userGrowth": user_growth,
            "recentOrders": list(recent_orders),
            "inventorySummary": inventory_summary
        }

        return Response(data)

