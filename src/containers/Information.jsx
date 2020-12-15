import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { Link, useHistory } from 'react-router-dom';
import '../styles/components/Information.css';
import { useForm } from 'react-hook-form';

const Information = () => {
  const { state, addToBuyer } = useContext(AppContext);
  const { cart } = state;
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    addToBuyer(data);
    history.push('/checkout/payment');
  };

  return (
    <div className="Information">
      <div className="Information-content">
        <div className="Information-head">
          <h2>Información de contacto:</h2>
        </div>
        <div className="Information-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Nombre completo"
              name="name"
              ref={register}
            />
            <input
              type="text"
              placeholder="Correo Electronico"
              name="email"
              ref={register({ required: true })}
            />
            {errors.email && 'Por favor introduce tu correo electronico.'}
            <input
              type="text"
              placeholder="Direccion"
              name="address"
              ref={register({ required: true })}
            />
            {errors.address && 'Por favor introduce tu Direccion.'}
            <input
              type="text"
              placeholder="apto"
              name="apto"
              ref={register({ required: true })}
            />
            {errors.apto && 'Por favor introduce tu apto.'}
            <input
              type="text"
              placeholder="Ciudad"
              name="city"
              ref={register({ required: true })}
            />
            {errors.city && 'Por favor introduce tu Ciudad.'}
            <input
              type="text"
              placeholder="Pais"
              name="country"
              ref={register({ required: true })}
            />
            {errors.country && 'Por favor introduce tu pais.'}
            <input
              type="text"
              placeholder="Estado"
              name="state"
              ref={register({ required: true })}
            />
            {errors.state && 'Por favor introduce tu estado.'}
            <input
              type="text"
              placeholder="Codigo postal"
              name="cp"
              ref={register({ required: true })}
            />
            {errors.cp && 'Por favor introduce tu codigo postal.'}
            <input
              type="text"
              placeholder="Telefono"
              name="phone"
              ref={register({ required: true })}
            />
            {errors.phone && 'Por favor introduce tu telefono.'}
            <div className="Information-buttons">
              <div className="Information-back">
                <Link to="/checkout">Regresar</Link>
              </div>
              <div className="Information-next">
                <button type="submit">Pagar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="Information-sidebar">
        <h3>Pedido:</h3>
        {cart.map((item) => (
          <div className="Information-item" key={item.title}>
            <div className="Information-element">
              <h4>{item.title}</h4>
              <span>${item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Information;
