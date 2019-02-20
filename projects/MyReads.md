## General
Great Job on your project so far, just a few more fixes and you will be ready to go :airplane:

## README
You should personalize your README file to your project, add a brief description of your project and instructions for installing and launching the project, this will help other developers to run your application and enhance your github portfolio :sparkles:.  Here's a great Udacity [README course](https://www.udacity.com/course/writing-readmes--ud777) to help you enhance your skills.

## Search page isn't working need enter
Search is working great when you hit the "Enter" Key, however it should show results as you type. You could do this by removing the condition to search only the keycode is 13 in the `updateQuery` function of the `Search` Component.
Also when the search returns no result, it doesn't empty the list, here you could verify if the list is empty and clear the result if it is.

## Empty Search:
Excellent work showing the search result. One small detail is that when the search returns no results, you should clear the list and either show an empty list or a no result message.  You can achieve this by clearing the array if an `empty array` error is return

## getAll after update
Instead of fetching the books from the backend you could update the books array in your state, since you already know the book that is being updated and to what shelf. This way your app would feel snappier.
This is technique is called [optimistic ui](https://uxplanet.org/optimistic-1000-34d9eefe4c05)

## difference Shelf/Search
Some books on the search result may contain the wrong shelf, for example the book `Artificial Intelligence` is set to the `Read`  shelf, however, it appears still appears as `none` shelf on the search page.

To avoid this issue you should compare each book on the search result with the books on your shelves. If the book exists in any of your shelves use that shelf instead and if doesn't set the shelf as none.

For example if you had all the books on the shelves as
```
myBooks = [
  {
   id: 1,
   title: 'book1',
   shelf: 'read'
  }
  {
    id: 2,
    title: 'book2',
    shelf: 'currentlyReading'
  }
]
```
and your search result returns this array:
```
searchedBooks = [
  {
    id: 1,
    title: 'book1',
    shelf: 'currentlyReading'
  }
  {
     id: 4,
     title: 'book4',
     shelf: 'wanToRead'
  }
]
```
You have to change each book's shelf on the search result `searchedBooks` where
* book with id `1` should show the shelf `read`
*  book with id `4` should show the shelf `none`

One way to accomplish this is to create at the `App` component level a `getBookShelf` function that receives the book id and return the book shelf. Pass. through props, that function all the way down to the `Book` component where you can get the shelf for each book at the `render` lifecycle hook.

## on Book component
Regarding the difference between the search result and your shelves(see project review for more detail) Here you could verify the correct book shelf with a function received through props that get the correct book's shelf from your shelves.

## Commented code:
Try to remove unnecessary commented code, this causes confusion in the future when you, or other developers, don't know why the code is commented and if it is safe to delete it.

## Uncomponetizide but mapped
You could create a `BookShelf` component and pass the `id`, `title` and `books` as props, this would make the code easier to read and you could use that component elsewhere if needed.

## Uncomponetizide:
The HTML and logic for all bookshelves are the same, the only thing that changes are the title and the books array.
Create a `BookShelf` component that can be used for all shelves.
You could also create an array with all your shelves and then on your HTML map through the array to show all shelves, for example:

```
const shelves = [
{
  id: 'currentlyReading',
  title: 'Currently Reading',
 books: books.filter(book => book.shelf === 'currentlyReading')
},
// ...other shelves
]
```
and on the HTML:
```
/*...HTML*/
shelves.map(shelf => (
 <BoofShelf id={shelf.id} title={title} books={shelf.books} />
)
/*...HTML*/
```
This reduces code duplication resulting in fewer bugs and code that is easier to read.

## MAP THROUGH SHELVES
You could create a `shelves` array that contains the title, id and books.
For example:
```
const shelves = [
{
  id: 'currentlyReading',
  title: 'Currently Reading',
 books: books.filter(book => book.shelf === 'currentlyReading')
},
// ...other shelves
]
```
and on the HTML:
```
shelves.map(shelf => (
 <BookShelf id={shelf.id} title={title} books={shelf.books} />
)
```
Then on your HTML map through this array instead of creating manually each shelf. This way it would be easier to add more shelves and reduce code repetition

## Thumbail error:

A small issue appears if you search for a book that has no thumbnail. Make sure to validate that `imageLinks` exists and if it doesn't show a default or no image.

**Buscar con la thi**

## Seach Works but is missing None
You did a great job comparing the books on the search result with the books on your shelf, however, remember to set the shelf to none if the book doesn't belong to any shelf. See code review for more detail

## Seach Works but is missing None(Code Review)
Remember to set the shelf to `none` if it doesn't belong to any shelf

## Extract book component:
You could extract this code into a Book Component, this would make your code easier to read, and you would be able to reuse the component somewhere else if needed.

## Shelf correcto menos el none
You did a great job comparing the books on the search result with the books on your shelf. Remember to set the shelf to none if the book doesn't belong to any shelf

## Extract to main:
You could extract this to a `Main` component to have a cleaner route :wink:

## Create HashTable para no loopear siempre
To avoid looping through all the books on the shelves for each book in the search result, you could create a hash table for the books like:
```
  hashTable = {}
  books.forEach( book => hashTable[book.id] = book.shelf
```
Then when looping for the search results you could do something like:
```
searchResults.forEach((book) => book.shelf = hashTable[book.id]  || 'none'))
```
What we are doing here is looping for each book, looking for the key in the hashTable and if doesn't exists set it as `none`

## ANTI PATTERN KEY
Using index as key is [an antipattern](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)

## OUTSIDE ASYNCHRONOUS
`BooksAPI.update` is an asynchronous function, this means that this function will be completed in the future and we don't know exactly when. The only way to perform an action and be certain that the books has been updated is if we wait until the promise is fullfiled by calling the `then` method (or `catch` if there is an error). Since you are calling `BooksAPI.get` outside the `then` method of `BooksAPI.update`, sometimes the API is getting the books before it has been updated in the backend by the `update` method. To fix this you could call `get` inside `then`.

I also recommend that instead of calling `this.componentDidMount()` you a create a separate function for getting the books for example `getBooks` and call that function inside `componentDidMount` and updateBookShelf( or even better  you could update the books array in your state, since you already know the book that is being updated and to what shelf. This way your app would feel snappier.)

## FIND INSTEAD OF FILTER
You could use [find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) instead of `filter` to gain a performance boost and have code, I think, is easier to read.

## IGNORE NODE_MODULES
Make sure to include a [.gitignore](https://help.github.com/articles/ignoring-files/) file and to include your node_modules in it

## UNSAVED PACKAGES
Make sure to save all the packages you are using in your `package.json` file using either `npm install --save <package>` or `yarn add <package>`, right now you are missing `react-router-dom`

## SEARCH SET STATE IS ASYNCRHONOUS
Great job on the search page, you just got a issue that although is really easy to fix it is important to understand why it happend.
The issue is that the query you are sending to the search endpoint is different than the search text.

This happens because [setState is asynchronous](https://medium.com/@wereHamster/beware-react-setstate-is-asynchronous-ce87ef1a9cf3), and you are using an old "version" of the state. To fix it either use the query param directly of using setState second parameter(its callback function) to perform the search operation.

## UPDATE DOESNT WORK AT ALL
You should update `books` property in the state with the book new data.
To accomplish this you could:
1. use the [object spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) to create a new book with the new shelf, for example, `const newBook = { ...book, shelf} `
2. Use the [filter](https://www.w3schools.com/jsref/jsref_filter.asp) method to remove the book from the list (if the book doesn't exist, this just won't do anything) for example:
```
const newBooks = this.state.books.filter(existingBook => existingBook.id !== book.id)
```
3. set books in the state with the [array spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) to add the newBook(with the new shelf) to the newBooks(without the book).
For example
```
this.setState({books: [ ...newBooks, newBook]})
```

## Console Logs
Is good practice to remove all unnecessary console.log prior shipping to production which in a way you are doing when you submit your project :wink:

## General(Awesomes!)
Excellent :tada: Your hard work has paid off. The "My Reads" App is working great.
Keep up the good work and best of lucks on your next project :star:
_Left you some comments that could help you improve your app even more!_

## Single Book Shelf Component(Awesomes!)
Awesome! :star: Having a single component to handle or your bookshelves reduces code repetition and makes it simpler to reuse

## Clean Routes(Awesomes!)
:star: Nice way of organizing your routes!

## Array of shelves(Awesomes!)
:100: Excellent, having an array of shelves makes your easier to expand and reduces code repetition!

## Property Validation(Awesomes!)
:100: validating an object has the property you are going to use avoid many possible bugs

## IMPROVE README(Awesomes!)
Your README files clearly indicate how to install and run your app :star:, you could improve it even more including a description, licensing, contribution, among other things. Here's a great Udacity [README course](https://www.udacity.com/course/writing-readmes--ud777) to help you enhance your skills.

## FIXED README(Awesomes!)
Excellent your README file has now personalized and pertinent information about your project :star:

## Bug Fixed
Great Job fixing the last bugs, the app search is working great now :star:

## Use Join
You could simplify this by using [join](https://www.w3schools.com/jsref/jsref_join.asp) for example:
```js
authors.join(';');
```