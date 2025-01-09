# AutoMappingSchema

The partial ratio helps us to perform substring matching. This takes the shortest string and compares it with all the substrings of the same length.

Str1 = "My name is Shubhneet"
Str2 = "My name is Shubhneet Chawla"
print(fuzz.partial_ratio(Str1.lower(),Str2.lower()))
The output of the code gives 100 as partial_ratio() just checks if either string is a substring of the other.

This ratio could be very useful if, for example, we are trying to match a person’s name between two datasets. In the first dataset, the string has the person’s first and last name, and in the second dataset, the string has the person’s first, middle, and last name. The ratio would be 100 because the first string is a substring in the second string.

Checkout this article about the machine learning algorithms

Token Sort Ratio using FuzzyWuzzy
In token sort ratio, a method used in fuzzy string matching, the strings are tokenized and pre-processed by converting to lower case and getting rid of punctuation. The strings are then sorted alphabetically and joined together. Post this, the Levenshtein distance similarity ratio is calculated between the strings.

Str1 = "My name is Shubhneet"
Str2 = "Shubhneet is my name"
print(fuzz.token_sort_ratio(Str1,Str2))
The output of the code gives 100 as the token sort ratio is found after sorting the strings alphabetically and hence the original order of words doesn’t matter.

Token Set Ratio using FuzzyWuzzy (Python)/ Fuzzball (Javascript)
Token set ratio performs a set operation that takes out the common tokens instead of just tokenizing the strings, sorting, and then pasting the tokens back together. Extra or same repeated words do not matter.

Str1 = "My name is Shubhneet"
Str2 = "Shubhneet is my name name"
print(fuzz.token_sort_ratio(Str1,Str2))
print(fuzz.token_set_ratio(Str1,Str2))
The output of the token sort ratio comes to be 85 while that of the token set ratio comes to be 100 as the token set ratio doesn’t take into account the repeated words.

