from django.contrib import admin

from .models import Address, UserProfile, GuestCustomer, CarType, Make, Product, Order
# Register your models here.


admin.site.register(Address)
admin.site.register(UserProfile)
admin.site.register(GuestCustomer)
admin.site.register(CarType)
admin.site.register(Make)
admin.site.register(Product)
admin.site.register(Order)