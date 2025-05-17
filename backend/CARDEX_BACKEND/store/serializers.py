from rest_framework import serializers
from .models import Product, CarType, Make, Order, Address, GuestCustomer


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'postal_code', 'house_address', 'created_at']
        read_only_fields = ['id', 'created_at']


class GuestCustomerSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = GuestCustomer
        fields = ['id', 'first_name', 'last_name', 'address']
        read_only_fields = ['id']

    def create(self, validated_data):
        address_data = validated_data.pop('address')
        address = Address.objects.create(**address_data)
        guest_customer = GuestCustomer.objects.create(address=address, **validated_data)
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
            'model_year', 'transmission', 'fuel_type', 'car_type', 'make'
        ]

class OrderSerializer(serializers.ModelSerializer):
    guest_customer = GuestCustomerSerializer()

    class Meta:
        model = Order
        fields = ['id', 'product', 'guest_customer', 'user', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']

    def create(self, validated_data):
        guest_customer_data = validated_data.pop('guest_customer')
        address_data = guest_customer_data.pop('address')
        address = Address.objects.create(**address_data)
        guest_customer = GuestCustomer.objects.create(address=address, **guest_customer_data)
        order = Order.objects.create(guest_customer=guest_customer, **validated_data)
        return order