erDiagram
    USER ||--o| UserProfile : "has"
    USER ||--o{ Order : "places"
    USER ||--o| Cart : "owns"
    USER ||--o{ CardDetails : "has"
    USER ||--o{ Review : "writes"

    Address ||--o{ UserProfile : "is linked to"
    Address ||--o{ GuestCustomer : "is linked to"
    Address ||--o{ Order : "is used in"

    GuestCustomer {
        int id
        string first_name
        string last_name
    }

    UserProfile {
        int id
    }

    Address {
        int id
        string postal_code
        string house_address
        datetime created_at
    }

    Order {
        int id
        string status
        datetime created_at
    }

    OrderItem {
        int id
        int quantity
    }

    Order ||--o{ OrderItem : "contains"
    Product ||--o{ OrderItem : "is in"

    Cart {
        int id
        datetime created_at
    }

    CartItem {
        int id
        int quantity
    }

    Cart ||--o{ CartItem : "contains"
    Product ||--o{ CartItem : "is in"

    Product {
        int id
        string name
        decimal price
        string description
        string mileage
        string model_year
        string transmission
        string fuel_type
        string condition
        int quantity
    }

    CarType ||--o{ Product : "categorizes"
    Make ||--o{ Product : "produces"

    CarType {
        int id
        string name
    }

    Make {
        int id
        string name
    }

    CardDetails {
        int id
        string name_on_card
        string card_number
        string expiry_date
        string cvv
    }

    Review {
        int id
        string review
        int rating
    }

    Product ||--o{ Review : "is reviewed by"}
