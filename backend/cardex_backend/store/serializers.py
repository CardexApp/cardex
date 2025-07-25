from rest_framework import serializers
from django.contrib.auth.models import User
from django.db import transaction
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Product, CarType, Make, Order, Address, CardDetails, CartItem, Cart, Review, OrderItem

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
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add extra user data
        data.update({
            'user': {
                'id': self.user.id,
                'email': self.user.email,
                'first_name': self.user.first_name,
                'last_name': self.user.last_name,
                'is_staff': self.user.is_staff,
                'is_superuser': self.user.is_superuser
            }
        })

        return data



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
            username=validated_data['email'],  # we're using email as username
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'is_staff', 'is_superuser']
        read_only_fields = ['first_name', 'last_name', 'email', 'is_staff', 'is_superuser']


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']

    def validate_email(self, value):
        user = self.context['request'].user
        if User.objects.filter(email=value).exclude(pk=user.pk).exists():
            raise serializers.ValidationError("Email is already in use by another account.")
        return value

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('email', instance.email)  # keep username = email
        instance.save()
        return instance


class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not check_password(value, user.password):
            raise serializers.ValidationError("Current password is incorrect.")
        return value

    def validate_new_password(self, value):
        # Add any password validation rules here if needed
        if len(value) < 8:
            raise serializers.ValidationError("New password must be at least 8 characters.")
        return value

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user


class AdminUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'is_staff', 'is_superuser']
        read_only_fields = ['id']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


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


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'user', 'review', 'rating']
        read_only_fields = ['id', 'user']


class ProductSerializer(serializers.ModelSerializer):
    car_type = serializers.PrimaryKeyRelatedField(queryset=CarType.objects.all()) 
    make = serializers.PrimaryKeyRelatedField(queryset=Make.objects.all())
    status = serializers.SerializerMethodField()
    reviews = ReviewSerializer(many=True, read_only=True, source='review_set')

    class Meta:
        model = Product
        fields = [
            'id', 'image', 'name', 'price', 'description', 'mileage',
            'model_year', 'transmission', 'fuel_type', 'car_type', 'make', 
            'condition', 'reviews', 'status'
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
    
    def get_status(self, obj):
        return obj.stock_status()

class ProductAdminSerializer(ProductSerializer):
    status = serializers.SerializerMethodField()

    class Meta(ProductSerializer.Meta):
        fields = ProductSerializer.Meta.fields + ['status', 'quantity']

    def get_status(self, obj):
        return obj.stock_status()


class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['product', 'review', 'rating']

    def validate(self, data):
        user = self.context['request'].user
        product = data['product']
        has_ordered = OrderItem.objects.filter(order__user=user, product=product).exists()
        if not has_ordered:
            raise serializers.ValidationError(
                "You can only review products you have purchased.")
        return data

    def create(self, validated_data):
        user = self.context['request'].user
        return Review.objects.create(user=user, **validated_data)


class OrderProductInputSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)

    def validate_product_id(self, value):
        if not Product.objects.filter(id=value).exists():
            raise serializers.ValidationError("Invalid product.")
        return value

# serializers.py
class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    card_details = CardDetailsSerializer(write_only=True)
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'created_at', 'address', 'status', 'card_details', 'items']
        read_only_fields = ['id', 'user', 'created_at', 'status']

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("You must include at least one product.")

        for item in value:
            quantity = item.get('quantity', 0)
            if quantity <= 0:
                raise serializers.ValidationError("Each item must have a quantity greater than zero.")

        return value

    def create(self, validated_data):
        request = self.context['request']
        user = request.user

        if not user or not user.is_authenticated:
            raise serializers.ValidationError("User must be authenticated to place an order.")

        address_data = validated_data.pop('address')
        card_data = validated_data.pop('card_details')
        items_data = validated_data.pop('items')

        with transaction.atomic():
            address = Address.objects.create(**address_data)
            order = Order.objects.create(user=user, address=address, **validated_data)

            for item in items_data:
                product = item['product']
                quantity = item['quantity']

                if product.quantity < quantity:
                    raise serializers.ValidationError(
                        f"{product.name} is out of stock or doesn't have enough quantity."
                    )

                product.quantity -= quantity
                product.save()

                OrderItem.objects.create(order=order, product=product, quantity=quantity)

            CardDetails.objects.create(user=user, **card_data)


            # 🛒 Reduce or remove items from cart
            try:
                cart = Cart.objects.get(user=user)
                for item in items_data:
                    product = item['product']
                    quantity_ordered = item['quantity']

                    try:
                        cart_item = CartItem.objects.get(cart=cart, product=product)
                        if cart_item.quantity > quantity_ordered:
                            cart_item.quantity -= quantity_ordered
                            cart_item.save()
                        else:
                            cart_item.delete()
                    except CartItem.DoesNotExist:
                        pass  # Item isn't in the cart, nothing to do
            except Cart.DoesNotExist:
                pass  # No cart to update


        return order

    

class ReturnRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['status']

    def validate_status(self, value):
        if value != 'return_requested':
            raise serializers.ValidationError("Only 'return_requested' is allowed.")
        
        order = self.instance
        if order.status == 'return_requested':
            raise serializers.ValidationError("Return request already initiated for this order.")
        if order.status != 'delivered':
            raise serializers.ValidationError("You can only request return for delivered orders.")
    
        
        return value



class AdminOrderUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['status']

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

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            raise serializers.ValidationError("Product does not exist.")

        if product.quantity < quantity:
            raise serializers.ValidationError(f"Only {product.quantity} of '{product.name}' available in stock.")

        # Get or create cart
        cart, created = Cart.objects.get_or_create(user=user)

        # Check if item already in cart
        item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            new_quantity = item.quantity + quantity
            if product.quantity < new_quantity:
                raise serializers.ValidationError(
                    f"Cannot add {quantity}. Cart already has {item.quantity}. Only {product.quantity} in stock."
                )
            item.quantity = new_quantity
        else:
            item.quantity = quantity

        item.save()
        return item


class ContactSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=15)
    message = serializers.CharField()