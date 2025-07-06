from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from store.models import Product, CarType, Make
from rest_framework_simplejwt.tokens import RefreshToken


class UserLoginTest(APITestCase):
    def setUp(self):
        self.username = "testuser"
        self.password = "testpass123"
        User.objects.create_user(
            username=self.username, password=self.password)

    def test_user_can_login_with_valid_credentials(self):
        url = reverse('token_obtain_pair')
        data = {
            "username": self.username,
            "password": self.password,
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)


class JWTExtraAuthTest(APITestCase):
    def setUp(self):
        self.username = "extratest"
        self.password = "extratest123"
        self.user = User.objects.create_user(
            username=self.username, password=self.password)

    def test_login_fails_with_wrong_password(self):
        url = reverse('token_obtain_pair')
        data = {
            "username": self.username,
            "password": "wrongpassword",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertNotIn('access', response.data)

    def test_refresh_token(self):
        url = reverse('token_obtain_pair')
        response = self.client.post(url, {
            "username": self.username,
            "password": self.password
        })
        refresh_token = response.data.get('refresh')
        self.assertIsNotNone(refresh_token)

        refresh_url = reverse('token_refresh')
        refresh_response = self.client.post(
            refresh_url, {"refresh": refresh_token})
        self.assertEqual(refresh_response.status_code, status.HTTP_200_OK)
        self.assertIn('access', refresh_response.data)


class UserRegistrationTest(APITestCase):
    def test_user_registration(self):
        url = reverse('register')
        data = {
            "email": "testnewuser@example.com",
            "password": "Testpass123!",
            "password2": "Testpass123!",
            "first_name": "Test",
            "last_name": "User"
        }
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("email", response.data)
        self.assertEqual(response.data["email"], data["email"])
        self.assertIn("first_name", response.data)
        self.assertEqual(response.data["first_name"], data["first_name"])
        self.assertIn("last_name", response.data)
        self.assertEqual(response.data["last_name"], data["last_name"])


class AddToCartTest(APITestCase):
    def setUp(self):
        self.car_type = CarType.objects.create(name="SUV")
        self.make = Make.objects.create(name="Toyota")

        self.user = User.objects.create_user(
            username="cartuser", password="cartpass123"
        )

        # Create JWT token
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

        self.product = Product.objects.create(
            name="Test Product",
            price=10.0,
            description="Test Description",
            mileage="10000",
            model_year="2020",
            transmission="manual",
            fuel_type="petrol",
            car_type=self.car_type,
            make=self.make,
            condition="new"
        )

    def test_add_to_cart(self):
        url = reverse('add-to-cart')
        data = {
            "product_id": self.product.id,
            "quantity": 3
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("id", response.data.get("cart_item", {}))
