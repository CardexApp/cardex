from django.urls import path

from .views import (
    ProductListView,
    ProductDetailView,
    CarTypeListView,
    ProductSearchView,
    GuestCheckoutView
)

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:id>/', ProductDetailView.as_view(), name='product-detail'),
    path('car-types/', CarTypeListView.as_view(), name='car-types'),
    path('products/search/', ProductSearchView.as_view(), name='product-search'),
    path('guest-checkout/', GuestCheckoutView.as_view(), name='guest-checkout'),
]