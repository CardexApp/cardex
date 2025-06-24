from rest_framework import serializers
from django.contrib.auth.models import User
from django.db import transaction
from .models import Product, CarType, Make, Order, Address, GuestCustomer, CardDetails, CartItem, Cart

# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# # Admin/Super Admin Login serializer
# class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         data = super().validate(attrs)
#         if not self.user.is_staff:
#             raise serializers.ValidationError("User is not an admin.")
#         data['username'] = self.user.username
#         data['is_staff'] = self.user.is_staff
#         data['user_id'] = self.user.id
#         data['is_superuser'] = self.user.is_superuser
#         return data


# Admin registration serializer
class AdminRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['password', 'email', 'first_name', 'last_name']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email has already been used.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
        first_name=validated_data['first_name'],
        last_name=validated_data['last_name'],
        username=validated_data['email'], # we're using email as username
        email=validated_data['email'],
        password=validated_data['password'],
        is_staff=True  # Mark as admin
        )
        return user


# User registration serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email has already been used.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['email'], # we're using email as username
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

# Address serializer
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'postal_code', 'house_address', 'created_at']
        read_only_fields = ['id', 'created_at']

# Card details serializer
class CardDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardDetails
        fields = [
            'id',
            'name_on_card',
            'card_number',
            'expiry_date',
            'cvv',
        ]
        read_only_fields = ['id']

# Guest customer serializer
# class GuestCustomerSerializer(serializers.ModelSerializer):
#     address = AddressSerializer()
#     card_details = CardDetailsSerializer()

#     class Meta:
#         model = GuestCustomer
#         fields = ['id', 'first_name', 'last_name', 'address', 'card_details']
#         read_only_fields = ['id']

#     def create(self, validated_data):
#         address_data = validated_data.pop('address')
#         card_data = validated_data.pop('card_details')

#         address = Address.objects.create(**address_data)
#         guest_customer = GuestCustomer.objects.create(address=address, **validated_data)
        
#         CardDetails.objects.create(guest_customer=guest_customer, **card_data)

#         return guest_customer
    
class CarTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarType
        fields = ['id', 'name']

class MakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Make
        fields = ['id', 'name']

class ProductSerializer(serializers.ModelSerializer):
    car_type = serializers.PrimaryKeyRelatedField(queryset=CarType.objects.all()) 
    make = serializers.PrimaryKeyRelatedField(queryset=Make.objects.all())

    class Meta:
        model = Product
        fields = [
            'id', 'image', 'name', 'price', 'description', 'mileage',
            'model_year', 'transmission', 'fuel_type', 'car_type', 'make', 
            'condition'
        ]

    # To show related details when retrieving:
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['car_type'] = {
            "id": instance.car_type.id,
            "name": instance.car_type.name
        }
        ret['make'] = {
            "id": instance.make.id,
            "name": instance.make.name
        }
        return ret

class ProductAdminSerializer(ProductSerializer):
    status = serializers.SerializerMethodField()

    class Meta(ProductSerializer.Meta):
        fields = ProductSerializer.Meta.fields + ['status', 'quantity']

    def get_status(self, obj):
        return obj.stock_status()

class OrderSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    card_details = CardDetailsSerializer(write_only=True)
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = Order
        fields = ['id', 'product', 'user', 'created_at', 'address', 'status', 'card_details']
        read_only_fields = ['id', 'created_at', 'user']

    def create(self, validated_data):
        request = self.context['request']
        user = request.user

        if not user or not user.is_authenticated:
            raise serializers.ValidationError("User must be authenticated to place an order.")
    
        address_data = validated_data.pop('address')
        card_data = validated_data.pop('card_details')
        product = validated_data.pop('product')

        if product.quantity <= 0:
            raise serializers.ValidationError("This product is out of stock.")

        with transaction.atomic():
            # Decrease stock
            product.quantity -= 1
            product.save()

            address = Address.objects.create(**address_data)
            order = Order.objects.create(address=address, user=user, product=product, **validated_data)
        
            CardDetails.objects.create(user=user, **card_data)
        return order

# CartItem serializer
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']

# Cart serializer
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'items']
        read_only_fields = ['id', 'user', 'created_at']

# For adding items to cart
class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)

    def validate_product_id(self, value):
        if not Product.objects.filter(id=value).exists():
            raise serializers.ValidationError("Product does not exist.")
        return value

    def save(self, **kwargs):
        user = self.context['request'].user
        product_id = self.validated_data['product_id']
        quantity = self.validated_data['quantity']

        # Get or create cart
        cart, created = Cart.objects.get_or_create(user=user)

        # Check if item already in cart
        item, created = CartItem.objects.get_or_create(cart=cart, product_id=product_id)
        if not created:
            item.quantity += quantity
        else:
            item.quantity = quantity
        item.save()
        return item
