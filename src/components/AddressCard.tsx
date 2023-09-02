import EditBtn from '../assets/edit.png'
import RemoveBtn from '../assets/remove.png'

interface Props {
  city: string
  country: string
  postalCode: string
  state: string
  streetName: string
  title: string
  addressId: string
  handleDelete: () => void
}

function AddressCard(props: Props) {
  const { city, country, postalCode, state, streetName, title, handleDelete } = props

  return (
    <div className="addresses__item">
      <div className="address__header">
        <p className="title address-title">{title}</p>
        <div className="address__action">
          <div className="edit__btn">
            <img src={EditBtn} alt="edit button" />
          </div>
          <div className="remove__btn" onClick={handleDelete}>
            <img src={RemoveBtn} alt="remove button" />
          </div>
        </div>
      </div>
      <div className="address__details">
        <div className="address__item">
          <p className="subtitle">City:</p> <p>{city}</p>
        </div>
        <div className="address__item">
          <p className="subtitle">Country:</p> <p>{country}</p>
        </div>
        <div className="address__item">
          <p className="subtitle">Postal code:</p> <p>{postalCode}</p>
        </div>
        <div className="address__item">
          <p className="subtitle">State:</p> <p>{state}</p>
        </div>
        <div className="address__item">
          <p className="subtitle">Street:</p> <p>{streetName}</p>
        </div>
      </div>
      <div className="checkbox-row">
        <div>
          <input type="checkbox" className="checkbox" id="checkbox1" />
          <label htmlFor="checkbox1">Default Billing Address</label>
        </div>
        <div>
          <input type="checkbox" className="checkbox" id="checkbox2" />
          <label htmlFor="checkbox2">Default Shipping Address</label>
        </div>
      </div>
    </div>
  )
}

export default AddressCard
