from rest_framework import generics, filters
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Product, CarType, Order
from .serializers import (
    ProductSerializer,
    CarTypeSerializer,
    OrderSerializer
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
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'mileage', 'model_year']
    ordering_fields = ['price', 'model_year']

# /api/guest-checkout/ POST
class GuestCheckoutView(generics.CreateAPIView):
    serializer_class = OrderSerializer
