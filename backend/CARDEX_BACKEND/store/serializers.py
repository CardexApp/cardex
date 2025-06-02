from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, CarType, Make, Order, Address, GuestCustomer, CardDetails, Cart


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

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'postal_code', 'house_address', 'created_at']
        read_only_fields = ['id', 'created_at']

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


class GuestCustomerSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    card_details = CardDetailsSerializer()

    class Meta:
        model = GuestCustomer
        fields = ['id', 'first_name', 'last_name', 'address', 'card_details']
        read_only_fields = ['id']

    def create(self, validated_data):
        address_data = validated_data.pop('address')
        card_data = validated_data.pop('card_details')

        address = Address.objects.create(**address_data)
        guest_customer = GuestCustomer.objects.create(address=address, **validated_data)
        
        CardDetails.objects.create(guest_customer=guest_customer, **card_data)

        return guest_customer
    
class CarTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarType
        fields = ['id', 'name']

class MakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Make
        fields = ['id', 'name']

class ProductSerializer(serializers.ModelSerializer):
    car_type = CarTypeSerializer(read_only=True)
    make = MakeSerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'image', 'name', 'price', 'description', 'mileage',
            'model_year', 'transmission', 'fuel_type', 'car_type', 'make', 'condition'
        ]

class OrderSerializer(serializers.ModelSerializer):
    guest_customer = GuestCustomerSerializer()

    class Meta:
        model = Order
        fields = ['id', 'product', 'guest_customer', 'user', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']

    def create(self, validated_data):
        guest_customer_data = validated_data.pop('guest_customer')
        guest_customer_serializer = GuestCustomerSerializer(data=guest_customer_data)
        guest_customer_serializer.is_valid(raise_exception=True)
        guest_customer = guest_customer_serializer.save()
    
        order = Order.objects.create(guest_customer=guest_customer, **validated_data)
        return order
    
class CartSerializer(serializers.ModelSerializer):  
    guest_customer = GuestCustomerSerializer()

    class Meta:
        model = Cart  # Assuming Cart is similar to Order
        fields = ['id', 'product', 'guest_customer', 'user', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']

    def create(self, validated_data):
        guest_customer_data = validated_data.pop('guest_customer')
        guest_customer_serializer = GuestCustomerSerializer(data=guest_customer_data)
        guest_customer_serializer.is_valid(raise_exception=True)
        guest_customer = guest_customer_serializer.save()
    
        cart = Cart.objects.create(guest_customer=guest_customer, **validated_data)  # Assuming Cart is similar to Order
        return cart