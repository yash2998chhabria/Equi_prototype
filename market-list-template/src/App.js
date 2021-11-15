import './App.css'
import Dexie from 'dexie'
import { useLiveQuery } from "dexie-react-hooks";
import { Offline, Online } from 'react-detect-offline'

const db = new Dexie('MarketList');
db.version(1).stores(
  { items: "++id,name,price,itemHasBeenPurchased" }
)


const App = () => {

  const allItems = useLiveQuery(() => db.items.toArray(), []);
  if (!allItems) return null

  const uploadofflinedata = () => {
    fetch('http://127.0.0.1:8000/api/offdatatest/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        offline_data: JSON.stringify(allItems), // Use your own property name / key
      }),
    })
      .then(async (res) => {
        console.log(res.status)
        await db.items.clear()
      })
      .catch((err) => console.log('error'))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    uploadofflinedata() // Save games when form is submitted
  }

  const addItemToDb = async event => {
    event.preventDefault()
    const name = document.querySelector('.item-name').value
    const price = document.querySelector('.item-price').value
    await db.items.add({
      name,
      price: Number(price),
      itemHasBeenPurchased: false
    })
  }
  
  const removeItemFromDb = async id => {
    await db.items.delete(id)
  }
  
  const markAsPurchased = async (id, event) => {
    if (event.target.checked) {
      await db.items.update(id, {itemHasBeenPurchased: true})
    }
    else {
      await db.items.update(id, {itemHasBeenPurchased: false})
    }
  }

  const itemData = allItems.map(({ id, name, price, itemHasBeenPurchased }) => (
    <div className="row" key={id}>
      <p className="col s5">
        <label>
          <input
            type="checkbox"
            checked={itemHasBeenPurchased}
            onChange={event => markAsPurchased(id, event)}
          />
          <span className="black-text">{name}</span>
        </label>
      </p>
      <p className="col s5">${price}</p>
      <i onClick={() => removeItemFromDb(id)} className="col s2 material-icons delete-button">
        delete
      </i>
    </div>
  ))

  return (
    <div className="container">
      <h3 className="green-text center-align">Market List App </h3>

      <form className="add-item-form" onSubmit={event => addItemToDb(event)} >
        <input type="text" className="item-name" placeholder="Name of item" required/>
        <input type="number" step=".01" className="item-price" placeholder="Price in USD" required/>
        <button type="submit" className="waves-effect waves-light btn right">Add item</button>
      </form>
      {allItems.length > 0 &&
        <div className="card white darken-1">
          <div className="card-content">
            <form action="#" onSubmit={handleSubmit}>
              { itemData }
              <p className="green-text center-align">
              <Online>You are currently Online! <p></p>
              <input type="submit" value="Submit" />
              </Online>
              <Offline>You are currently offline!</Offline> 
              </p>
            </form>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
