class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

cat1 = Cat("Masha", 5)
cat2 = Cat("Perly", 7)
cat3 = Cat("Caramel", 8)

def oldest_cat(*cats):
    return max(cats, key=lambda cat: cat.age)

oldest = oldest_cat(cat1, cat2, cat3)
print(f"The oldest cat is {oldest.name}, age {oldest.age}")