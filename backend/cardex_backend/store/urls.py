from django.urls import path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    ProductListView,
    ProductDetailView,
    CarTypeListView,
    ProductSearchView,
    CheckoutView,
    OrderView,
    RegisterView,
    UserCartView,
    AddToCartView,
    RemoveFromCartView,
    AdminRegisterView,
    ProductViewSet,
    OrderViewSet,
    UserProfileUpdateView,
    PasswordChangeView,
    UserProfileView,
    AdminUserViewSet,
    ReturnRequestView,
    ContactUsView,
    ReviewCreateView,
    ProductReviewListView,
    CustomTokenObtainPairView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('me/', UserProfileView.as_view(), name='user-profile'),
    path('update-profile/', UserProfileUpdateView.as_view(), name='profile-update'),
    path('change-password/', PasswordChangeView.as_view(), name='password-change'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:id>/', ProductDetailView.as_view(), name='product-detail'),
    path('products/<int:id>/reviews/', ProductReviewListView.as_view(), name='product-reviews'),
    path('reviews/', ReviewCreateView.as_view(), name='review-create'),
    path('car-types/', CarTypeListView.as_view(), name='car-types'),
    path('products/search/', ProductSearchView.as_view(), name='product-search'),
    path('checkout/', CheckoutView.as_view(), name='checkout'),
    path('orders/', OrderView.as_view(), name='order-list'),
    path('orders/<int:pk>/return/', ReturnRequestView.as_view(), name='order-return-request'),
    path('cart/', UserCartView.as_view(), name='user-cart'),
    path('cart/add/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart/remove/<int:product_id>/', RemoveFromCartView.as_view(), name='remove-from-cart'),
    



    #admin routes
    path('admin/login/', CustomTokenObtainPairView.as_view(), name='admin-login'),
    path('admin/register/', AdminRegisterView.as_view(), name='admin-register'),
    path('admin/me/', UserProfileView.as_view(), name='user-profile'),
    path('admin/update-profile/', UserProfileUpdateView.as_view(), name='profile-update'),
    path('admin/change-password/', PasswordChangeView.as_view(), name='password-change'),
    path('admin/products/', ProductViewSet.as_view({'get': 'list', 'post': 'create'}), name='admin-products-list'),
    path('admin/products/<int:pk>/', ProductViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='admin-products-detail'),
    path('admin/orders/', OrderViewSet.as_view({'get': 'list'}), name='admin-orders-list'),
    path('admin/orders/<int:pk>/', OrderViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'}), name='admin-orders-detail'),
    path('admin/users/', AdminUserViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('admin/users/<int:pk>/', AdminUserViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'put': 'update', 'delete': 'destroy'})),
    path('contact/', ContactUsView.as_view(), name='contact')
    ]

