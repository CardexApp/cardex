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

    @task(1)  # Just view_products task remains
    def view_products(self):
        if not self.token:
            print("Skipping view_products: no auth token")
            return

        headers = {"Authorization": f"Bearer {self.token}"}
        response = self.client.get("/api/products/", headers=headers)
        if response.status_code != 200:
            print(
                f"View products failed: {response.status_code} -> {response.text}")
