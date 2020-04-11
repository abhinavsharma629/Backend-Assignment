# Backend-Assignment

## Tasks

### BACKEND:
  - Create an NGO object with 7 fields- Logo (image url), Name (text), Registration date (date), Can receive foreign funding (boolean),         Email ID for correspondence (Email format), Address (Line 1, Line 2, City, District, State, Pincode), Claimed/Unclaimed (boolean)
  - Feed 5 dummy NGOs into the DB (all with complete information set)

### FRONTEND:
  - Create a search section, to search for NGOs by Name, Filter them by "Can receive foreign funding", "State", "District", "City". (Make       this responsive)
  - Populate the filtered set (based on the search criteria) (Make this responsive)
  - If the NGO is unclaimed, show a "CLAIM" button against it. If the NGO is claimed, show a button which reads "VIEW PROFILE" against it.
  - Upon clicking on the "CLAIM" button, take me to a form like this: https://www.letsendorse.com/ngoForm (Replicate the fields) and pre-       populate all the 7 fields which already existed. (Make all fields mandatory)
  - Upon filling the form and submitting, change the Claimed/Unclaimed status to Claimed.

### Add Ons:
  - Api for adding dummy data
  - Filter based on:
    - Regrex NGO Name Query
    - NGO Id
    - Limits on amount on data returned
    
