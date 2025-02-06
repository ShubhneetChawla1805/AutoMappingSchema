# AutoMappingSchema

-------------------------------------------------------------------------------------
**NOTE** : **FuzzyWuzzy** is a utility in _Python_ and **Fuzzball** is to be used in _Javascript_
-------------------------------------------------------------------------------------

**Partial ratio** 
---------------------------------------------------------------------
The **Partial ratio** helps us to perform substring matching. This **takes the shortest string and compares it with all the substrings of the same length.**

Str1 = "My name is Shubhneet"	|| Str2 = "My name is Shubhneet Chawla"

print(fuzz.partial_ratio(Str1.lower(),Str2.lower()))

The output of the code gives 100 as partial_ratio() just checks if either string is a substring of the other.
_____________________________________________________________________________________________________________________________________________________________________

**Token Sort Ratio** using FuzzyWuzzy (Python)/ Fuzzball (Javascript)
---------------------------------------------------------------------
In **token sort ratio**,  method used in fuzzy string matching, the **strings are tokenized and pre-processed by converting to lower case and getting rid of punctuation**. The strings are then sorted alphabetically and joined together. Post this, the Levenshtein distance similarity ratio is calculated between the strings.

Str1 = "My name is Shubhneet"	|| Str2 = "Shubhneet is my name"

print(fuzz.token_sort_ratio(Str1,Str2))

The output of the code gives 100 as the token sort ratio is found after **sorting the strings alphabetically and hence the original order of words doesn’t matter.**
_____________________________________________________________________________________________________________________________________________________________________
**Token Set Ratio** using FuzzyWuzzy (Python)/ Fuzzball (Javascript)
---------------------------------------------------------------------
**Token set ratio** performs a set operation that **takes out the common tokens instead of just tokenizing the strings, sorting, and then pasting the tokens back together. Extra or same repeated words do not matter.**


Str1 = "My name is Shubhneet" || Str2 = "Shubhneet is my name name"
print(fuzz.token_sort_ratio(Str1,Str2))
print(fuzz.token_set_ratio(Str1,Str2))
The output of the token sort ratio comes to be 85 while that of the token set ratio comes to be 100 as the **token set ratio doesn’t take into account the repeated words.
**
