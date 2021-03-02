# [ Pandabize Web Store ](https://pandabize-webstore.herokuapp.com/)

#### Funtionalities
A website for a fictional bicycle shop which helps to customize bicycles while buying.
Admin can add new models of bicycle and add customizable items to it.
>Example:
> wheel size (ie 15, 17, 19 inches)
> rim color/pattern (blue, black, spotted etc)
> saddle color (black, blue, brown, whatever)

There are some limitations added by admin. 
> wheel size 17, 19, 21
> rim color: black, blue, green
>If you select 17 inch wheel, there is only one possibility for the rim color — green > if you select 19, then you already can select between green and blue
> Only if you chose 21, then all 3 colors are available


#### How does admin configure ?
- Add Bicycle Model in admin section
- Move to property section  and add all the customizable property of a specific model. This properties are no common to other models so the limitaions can be maintained.
- If we want the same property to be configured to another model we will have to add the property.
- this is the same with options as well.
- Editing a property/option will not effect the same property of another model.


### Backend
Api is developed with ***Ruby On Rails***
**Code :** [https://github.com/shimronduan/pandabize-store-api]
