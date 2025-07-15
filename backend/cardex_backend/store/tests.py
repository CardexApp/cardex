from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from store.models import Product, CarType, Make, Order, OrderItem
from rest_framework_simplejwt.tokens import RefreshToken


class UserLoginTest(APITestCase):
    def setUp(self):
        self.username = "testuser"
        self.password = "testpass123"
        User.objects.create_user(
            username=self.username, password=self.password)

    def test_user_can_login_with_valid_credentials(self):
        url = reverse('token_obtain_pair')
        data = {"username": self.username, "password": self.password}
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
        data = {"username": self.username, "password": "wrongpassword"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_refresh_token(self):
        url = reverse('token_obtain_pair')
        response = self.client.post(
            url, {"username": self.username, "password": self.password})
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
        self.assertEqual(response.data["email"], data["email"])
        self.assertEqual(response.data["first_name"], data["first_name"])
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
            condition="new",
            quantity=10  # MAKE SURE quantity > 0
        )

    def test_add_to_cart(self):
        url = reverse('add-to-cart')
        data = {
            "product_id": self.product.id,
            "quantity": 3
        }
        response = self.client.post(url, data, format='json')
        print("Add to cart response data:", response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("id", response.data.get("cart_item", {}))


class GetAllCartProductsTest(APITestCase):
    def setUp(self):
        self.car_type = CarType.objects.create(name="SUV")
        self.make = Make.objects.create(name="Toyota")
        self.user = User.objects.create_user(
            username="cartuser", password="cartpass123")
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

        self.client.post(reverse('add-to-cart'), {
            "items": [{"product_id": self.product.id, "quantity": 2}]
        }, format='json')

    def test_get_all_cart_products(self):
        url = reverse('user-cart')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)


class GetAllProductsTest(APITestCase):
    def setUp(self):
        self.car_type = CarType.objects.create(name="Sedan")
        self.make = Make.objects.create(name="Honda")
        self.product1 = Product.objects.create(
            name="Product 1", price=10000.0, description="Description 1",
            mileage="5000", model_year="2022", transmission="automatic",
            fuel_type="diesel", car_type=self.car_type, make=self.make, condition="new"
        )
        self.product2 = Product.objects.create(
            name="Product 2", price=8000.0, description="Description 2",
            mileage="10000", model_year="2021", transmission="manual",
            fuel_type="petrol", car_type=self.car_type, make=self.make, condition="used"
        )

    def test_get_all_products(self):
        url = reverse('product-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertIn("id", response.data[0])
        self.assertIn("name", response.data[0])


class RemoveFromCartTest(APITestCase):
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
            condition="new",
            quantity=10
        )

        # Add to cart first
        self.client.post(reverse('add-to-cart'), {
            "product_id": self.product.id,
            "quantity": 2
        }, format='json')

    def test_remove_from_cart(self):
        # Remove product from cart by product ID
        url = reverse('remove-from-cart', args=[self.product.id])
        response = self.client.delete(url)
        print("Remove from cart response:", response.data)
        self.assertIn(response.status_code, [200, 204])

        # Verify cart is now empty
        cart_response = self.client.get(reverse('user-cart'))
        print("Cart after removal:", cart_response.data)
        self.assertEqual(len(cart_response.data.get('items', [])), 0)


class GetUserOrdersTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="orderuser", password="orderpass123")
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

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

        order1 = Order.objects.create(user=self.user)
        order2 = Order.objects.create(user=self.user)
        OrderItem.objects.create(
            order=order1, product=self.product, quantity=1)
        OrderItem.objects.create(
            order=order2, product=self.product, quantity=1)

    def test_get_user_orders(self):
        url = reverse('order-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertIn("id", response.data[0])
        self.assertIn("items", response.data[0])


class GetAllCarTypesTest(APITestCase):
    def setUp(self):
        CarType.objects.create(name="SUV")
        CarType.objects.create(name="Sedan")
        CarType.objects.create(name="Truck")

    def test_get_all_car_types(self):
        url = reverse('car-types')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)
        self.assertIn("id", response.data[0])
        self.assertIn("name", response.data[0])


class GetUserProfileTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="profileuser",
            email="profile@example.com",
            password="profilepass123",
            first_name="Profile",
            last_name="User"
        )
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_get_user_profile(self):
        url = reverse('user-profile')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], self.user.email)
        self.assertEqual(response.data["first_name"], self.user.first_name)
        self.assertEqual(response.data["last_name"], self.user.last_name)


class UpdateUserProfileTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="profileuser",
            email="oldemail@example.com",
            password="profilepass123",
            first_name="OldFirst",
            last_name="OldLast"
        )
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_update_user_profile_success(self):
        url = reverse('profile-update')
        data = {
            "first_name": "NewFirst",
            "last_name": "NewLast",
            "email": "newemail@example.com"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, data['first_name'])
        self.assertEqual(self.user.last_name, data['last_name'])
        self.assertEqual(self.user.email, data['email'])

    def test_update_user_profile_unauthenticated(self):
        self.client.force_authenticate(user=None)
        url = reverse('profile-update')
        data = {
            "first_name": "ShouldNotWork",
            "last_name": "ShouldNotWork",
            "email": "noaccess@example.com"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class AuthenticatedCheckoutTest(APITestCase):
    def setUp(self):
        self.car_type = CarType.objects.create(name="SUV")
        self.make = Make.objects.create(name="Toyota")
        self.user = User.objects.create_user(
            username="checkoutuser", password="checkoutpass123")
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

        self.product = Product.objects.create(
            name="Checkout Product",
            price=20.0,
            description="Checkout Test Product",
            mileage="15000",
            model_year="2021",
            transmission="manual",
            fuel_type="diesel",
            car_type=self.car_type,
            make=self.make,
            condition="new",
            quantity=5
        )

    def test_authenticated_checkout(self):
        url = reverse('checkout')
        data = {
            "address": {
                "postal_code": "12345",
                "house_address": "123 Elm Street"
            },
            "card_details": {
                "name_on_card": "Checkout User",
                "card_number": "4111111111111111",
                "expiry_date": "12/30",
                "cvv": "123"
            },
            "items": [
                {"product": self.product.id, "quantity": 1}
            ]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('order', response.data)
        self.assertEqual(response.data['order']['user'], self.user.id)
