# qst 1
brand = { 
    "name":"Zara",
    "creation_date":1975,
    "creator_name":"Amancio Ortega Gaona",
    "type_of_clothes":["men", "women", "children", "home"],
    "international_competitors":["Gap", "H&M", "Benetton"],
    "number_stores":7000,
    "major_color":{ 
            "France":"blue",
            "Spain":"red",
            "US":["pink", "green"]
         }
      }
# qst 2
brand["number_stores"] = 2

print(brand)
# qst 3
print(f"the clients of this brand are: {' ,'.join(brand["type_of_clothes"])}")
# qst 4
brand["country_creation"] = "Spain"
# qst 5
if "international_competitors" in brand:

    brand["international_competitors"].append("Desigual")
print(brand["international_competitors"])
# qst 6
del brand['creation_date']
print(brand)
# qst 7
print(brand["international_competitors"][-1])
# qst 8
print(brand["major_color"]["US"])
# qst 9
print(f"Zara brand has : {len(brand)} keys")
# qst 10
print(list(brand.keys()))
# qst 11
more_on_zara = { 
    
    "creation_date":1975,
    "number_stores":10000,
}
# qst 12
brand.update(more_on_zara)
print(brand)
# qst 13
print(brand["number_stores"])#the number of stores has changed to moreonzara number stores

