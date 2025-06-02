from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    ProductListView,
    ProductDetailView,
    CarTypeListView,
    ProductSearchView,
    GuestCheckoutView,
    RegisterView,
    CartListCreateView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:id>/', ProductDetailView.as_view(), name='product-detail'),
    path('car-types/', CarTypeListView.as_view(), name='car-types'),
    path('products/search/', ProductSearchView.as_view(), name='product-search'),
    path('guest-checkout/', GuestCheckoutView.as_view(), name='guest-checkout'),
    path('cart/', CartListCreateView.as_view(), name='cart-list-create'),
]