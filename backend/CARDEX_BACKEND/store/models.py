from django.db import models

from django.db import models
from django.contrib.auth.models import User

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

    def __str__(self):
        return self.name


# Order
class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    guest_customer = models.ForeignKey(GuestCustomer, on_delete=models.SET_NULL, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id}"
    
# Cart
class Cart(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    guest_customer = models.ForeignKey(GuestCustomer, on_delete=models.SET_NULL, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id}"

#Card details
class CardDetails(models.Model):
    name_on_card = models.CharField(max_length=100)
    card_number = models.CharField(max_length=16)
    expiry_date = models.DateField()
    cvv = models.CharField(max_length=4)

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    guest_customer = models.OneToOneField(GuestCustomer, related_name='card_details', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.name_on_card} - ****{self.card_number[-4:]}"