
class Circle:
    def __init__(self, radius=None, diameter=None):

        if radius is not None and diameter is not None:
            raise ValueError("Please specify only radius OR diameter")
        
        if radius is not None:
            if radius <= 0:
                raise ValueError("Radius must be positive")
            self.radius = radius
        elif diameter is not None:
            if diameter <= 0:
                raise ValueError("Diameter must be positive")
            self.radius = diameter / 2
        else:
            raise ValueError("Please specify either radius or diameter")
    
    def get_diameter(self):
        return self.radius * 2
    
    def set_diameter(self, value):
        if value <= 0:
            raise ValueError("Diameter must be positive")
        self.radius = value / 2
    
    def area(self):
        return 3.14159 * (self.radius ** 2)
    
    def __str__(self):
        return f"Circle with radius: {self.radius:.2f}, diameter: {self.get_diameter():.2f}, area: {self.area():.2f}"
    
    def __repr__(self):
        return f"Circle(radius={self.radius:.2f})"
    
    def __add__(self, other):
        if not isinstance(other, Circle):
            raise TypeError("Can only add two circles together")
        new_radius = self.radius + other.radius
        return Circle(radius=new_radius)
    
    def __lt__(self, other):
        if not isinstance(other, Circle):
            raise TypeError("Can only compare two circles")
        return self.radius < other.radius
    
    def __eq__(self, other):
        if not isinstance(other, Circle):
            return False
        return self.radius == other.radius
    
    def __le__(self, other):
        return self < other or self == other
    
    def __gt__(self, other):
        return not self <= other
    
    def __ge__(self, other):
        return not self < other


if __name__ == "__main__":

    circle1 = Circle(radius=5)
    circle2 = Circle(diameter=10)  # This should have radius 5
    circle3 = Circle(radius=3)
    circle4 = Circle(radius=7)
    
    print("=== Circle Information ===")
    print(f"Circle 1: {circle1}")
    print(f"Circle 2: {circle2}")
    print(f"Circle 3: {circle3}")
    print(f"Circle 4: {circle4}")
    print()
    

    print("=== Area Calculation ===")
    print(f"Area of circle 1: {circle1.area():.2f}")
    print(f"Area of circle 3: {circle3.area():.2f}")
    print()
    

    print("=== Diameter Methods ===")
    print(f"Circle 1 diameter: {circle1.get_diameter()}")
    circle1.set_diameter(20)
    print(f"After setting diameter to 20, radius is: {circle1.radius}")
    print(f"New diameter: {circle1.get_diameter()}")
    print()
    
  
    print("=== Adding Circles ===")
    circle5 = circle1 + circle3
    print(f"Circle 1 + Circle 3 = {circle5}")
    print(f"New radius: {circle5.radius}")
    print()
    

    print("=== Comparisons ===")
    print(f"Circle 1 == Circle 2: {circle1 == circle2}")
    print(f"Circle 1 == Circle 3: {circle1 == circle3}")
    print(f"Circle 1 > Circle 3: {circle1 > circle3}")
    print(f"Circle 3 < Circle 4: {circle3 < circle4}")
    print()
    

    print("=== Sorting Circles ===")
    circles = [circle4, circle1, circle3, circle2]
    print("Before sorting:")
    for i, circle in enumerate(circles, 1):
        print(f"  Circle {i}: radius {circle.radius}")
    
    circles.sort()
    print("After sorting:")
    for i, circle in enumerate(circles, 1):
        print(f"  Circle {i}: radius {circle.radius}")
    

    print("\n=== Creating from Diameter ===")
    circle6 = Circle(diameter=14)
    print(f"Circle with diameter 14: radius={circle6.radius}, diameter={circle6.get_diameter()}")