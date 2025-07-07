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


class GetAllCartProductsTest(APITestCase):
    def setUp(self):
        self.car_type = CarType.objects.create(name="SUV")
        self.make = Make.objects.create(name="Toyota")

        self.user = User.objects.create_user(
            username="cartuser", password="cartpass123"
        )

        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}'
        )

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

        # Add to cart first
        self.client.post(reverse('add-to-cart'), {
            "product_id": self.product.id,
            "quantity": 2
        }, format='json')

    def test_get_all_cart_products(self):
        url = reverse('user-cart')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)


class GetAllProductsTest(APITestCase):
    def setUp(self):
        # Setup some CarType and Make to create Products
        self.car_type = CarType.objects.create(name="Sedan")
        self.make = Make.objects.create(name="Honda")

        # Create two products
        self.product1 = Product.objects.create(
            name="Product 1",
            price=10000.0,
            description="Description 1",
            mileage="5000",
            model_year="2022",
            transmission="automatic",
            fuel_type="diesel",
            car_type=self.car_type,
            make=self.make,
            condition="new"
        )

        self.product2 = Product.objects.create(
            name="Product 2",
            price=8000.0,
            description="Description 2",
            mileage="10000",
            model_year="2021",
            transmission="manual",
            fuel_type="petrol",
            car_type=self.car_type,
            make=self.make,
            condition="used"
        )

    def test_get_all_products(self):
        url = reverse('product-list')  # name='product-list' in urls.py
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, list)
        self.assertEqual(len(response.data), 2)

        # Check content structure
        first_product = response.data[0]
        self.assertIn("id", first_product)
        self.assertIn("name", first_product)
        self.assertIn("price", first_product)


class GuestCheckoutTest(APITestCase):
    def setUp(self):
        self.car_type = CarType.objects.create(name="SUV")
        self.make = Make.objects.create(name="Toyota")
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

    def test_guest_checkout_creates_order(self):
        url = reverse('guest-checkout')
        data = {
            "product": self.product.id,
            "guest_customer": {
                "first_name": "John",
                "last_name": "Doe",
                "address": {
                    "postal_code": "12345",
                    "house_address": "123 Elm Street"
                },
                "card_details": {
                    "name_on_card": "John Doe",
                    "card_number": "4111111111111111",
                    "expiry_date": "2030-12-31",
                    "cvv": "123"
                }
            }
        }

        response = self.client.post(url, data, format='json')
        print(response.data)  # helpful for debugging if test fails
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
