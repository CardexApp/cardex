from locust import HttpUser, task, between


class CardexUser(HttpUser):
    wait_time = between(1, 3)

    def on_start(self):

        response = self.client.post("/api/login/", json={
            "username": "ujua@gmail.com",
            "password": "Roseford112"
        })
        if response.status_code == 200:
            self.token = response.json().get("access")
            print(f"Logged in successfully. Token: {self.token}")
        else:
            print(f"Login failed: {response.status_code} -> {response.text}")
            self.token = None

    @task(3)
    def view_products(self):
        headers = {"Authorization": f"Bearer {self.token}"} if self.token else {}
        response = self.client.get("/api/products/", headers=headers)
        if response.status_code != 200:
            print(
                f"View products failed: {response.status_code} -> {response.text}")

    @task(2)
    def add_to_cart(self):
        headers = {"Authorization": f"Bearer {self.token}"} if self.token else {}
        response = self.client.post("/api/cart/add/", json={
            "product_id": 6,
            "quantity": 1
        }, headers=headers)
        if response.status_code not in (200, 201):
            print(
                f"Add to cart failed: {response.status_code} -> {response.text}")
