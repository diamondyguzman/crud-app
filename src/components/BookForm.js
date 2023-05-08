import React from 'react';

export default function BookForm({addMyBook}){
const [bookDetails,setBookDetails] = React.useState({
    name:' ',
    author:' ',
    desc:' ',
    image:' ',
})

    async function submitForm(e){
        e.preventDefault();
        addMyBook(bookDetails);
     
    }

    function updateBookDetails(e){
        const {value, name} = e.currentTarget;
        setBookDetails({...bookDetails, [name]:value})

    }
    return (
        <>
            <form onSubmit={submitForm}>
              <div>
                <label>Book Name:</label>
                <input name='name' type='text' value={bookDetails.name} onChange={updateBookDetails}/>
              </div>
              <div>
                <label>Book Description:</label>
                <input name='desc' type='text' value={bookDetails.desc} onChange={updateBookDetails}/>
              </div>
              <div>
                <label>Book Cover:</label>
                <input name='image' type='text'value={bookDetails.image} onChange={updateBookDetails}/>
              </div>
              <div>
                <label>Book Author:</label>
                <input name='author' type='text' step='1' value={bookDetails.author} onChange={updateBookDetails}/>
              </div>
              <div>
                <button  type='submit'>Add</button>
              </div>
              
              
            </form>
        </>
    )
}