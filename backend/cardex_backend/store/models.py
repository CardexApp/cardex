from django.db import models

from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.


# Address model
class Address(models.Model):
    postal_code = models.CharField(max_length=20)
    house_address = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.house_address


# Extend User with Address (optional)
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


# Guest customer
class GuestCustomer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


# Car type
class CarType(models.Model):
    CAR_CHOICES = [
        ('suv', 'SUV'),
        ('sedan', 'Sedan'),
        ('hatchback', 'Hatchback'),
        ('pickup_truck', 'Pickup Truck'),
        ('coupe', 'Coupe'),
        ('convertible', 'Convertible'),
        ('estate', 'Estate'),
        ('minivan', 'Minivan'),
        ('crossover', 'Crossover'),
    ]
    name = models.CharField(max_length=20, choices=CAR_CHOICES, unique=True)

    def __str__(self):
        return self.name


# Make
class Make(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# Product
class Product(models.Model):
    TRANSMISSION_CHOICES = [
        ('manual', 'Manual'),
        ('automatic', 'Automatic')
    ]

    FUEL_CHOICES = [
        ('petrol', 'Petrol'),
        ('diesel', 'Diesel'),
        ('electric', 'Electric'),
        ('hydrogen', 'Hydrogen')
    ]

    CONDITION = [
        ('new', 'New'),
        ('used', 'Used')
    ]

    image = models.ImageField(upload_to='products/', blank=True, null=True)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    mileage = models.CharField(max_length=50)
    model_year = models.CharField(max_length=50)
    transmission = models.CharField(max_length=10, choices=TRANSMISSION_CHOICES)
    fuel_type = models.CharField(max_length=10, choices=FUEL_CHOICES)
    car_type = models.ForeignKey(CarType, on_delete=models.CASCADE)
    make = models.ForeignKey(Make, on_delete=models.CASCADE)
    condition = models.CharField(max_length=10, choices=CONDITION)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name
    
    def stock_status(self):
        if self.quantity == 0:
            return "Out of Stock"
        elif self.quantity < 5:
            return "Low Stock"
        else:
            return "In Stock"


# Order
class Order(models.Model):

    STATUS_CHOICES = [
        ('processing', 'Processing'),
        ('dispatched', 'Dispatched'),
        ('delivered', 'Delivered'),
        ('return_requested', 'Return request initiated'),
        ('return_accepted', 'Return request accepted'),
        ('return_denied', 'Return request denied'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='processing')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.get_status_display()}"
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.quantity} x {self.product.name} (Order #{self.order.id})"


# Cart model - represents one cart per user
class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # One cart per user
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s Cart"

# CartItem model - products inside the cart
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"

#Card details
class CardDetails(models.Model):
    name_on_card = models.CharField(max_length=100)
    card_number = models.CharField(max_length=16)
    expiry_date = models.CharField(max_length=5) 
    cvv = models.CharField(max_length=4)

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    # guest_customer = models.OneToOneField(GuestCustomer, related_name='card_details', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.name_on_card} - ****{self.card_number[-4:]}"
    

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    review = models.TextField()
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])  # out of 5

    class Meta:
        unique_together = ('user', 'product')  # Optional: one review per user per product

    def __str__(self):
        return f"Review by {self.user.username} for {self.product.name} ({self.rating}/5)"