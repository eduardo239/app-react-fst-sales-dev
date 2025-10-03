import ButtonInput from './components/ButtonInput';
import CardItem from './components/CardItem';
import CardWrapper from './components/CardWrapper';
import CartList from './components/CartList';
import Checkout from './components/Checkout';
import FilterBar from './components/FilterBar';
import FormWrapper from './components/FormWrapper';
import HeaderBar from './components/HeaderBar';
import InputField from './components/InputField';
import SocialButton from './components/SocialButton';
import { cartItems, products } from './db';

export default function App() {
  return (
    <div>
      <HeaderBar />

      <div className="p-4">
        <FilterBar
          // Categories
          categories={[
            { id: 'electronics', label: 'Electronics' },
            { id: 'clothing', label: 'Clothing' },
            // ...
          ]}
          selectedCategory="electronics"
          onCategoryChange={(category) => {
            // Handle category change
          }}
          // Price Ranges
          priceOptions={[
            { id: 'under-50', label: 'Under $50', range: { min: 0, max: 50 } },
            { id: '50-100', label: '$50 - $100', range: { min: 50, max: 100 } },
            // ...
          ]}
          selectedPrice="under-50"
          onPriceChange={(priceId) => {
            // Handle price change
          }}
          // Sort Options
          sortOptions={[
            { id: 'popular', label: 'Most Popular' },
            { id: 'newest', label: 'Newest First' },
            { id: 'price-low', label: 'Price: Low to High' },
            { id: 'price-high', label: 'Price: High to Low' },
          ]}
          selectedSort="popular"
          onSortChange={(sort) => {
            // Handle sort change
          }}
        />
      </div>

      <Checkout onSubmit={(data) => console.log(data)} />

      <div className="p-4">
        <FormWrapper>
          <h3>Login</h3>
          <InputField label="E-mail" placeholder="Type here..." />
          <InputField label="Name" placeholder="Type here..." />
          <ButtonInput>Submit</ButtonInput>
        </FormWrapper>
      </div>

      <div className="p-4">
        <FormWrapper>
          <h3>Register</h3>
          <InputField label="Username" placeholder="Type here..." />
          <InputField label="Email" placeholder="Type here..." />
          <InputField
            label="Password"
            type="password"
            placeholder="Type here..."
          />
          <ButtonInput>Submit</ButtonInput>
        </FormWrapper>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <SocialButton provider="google" />
        <SocialButton provider="facebook" variant="outline" />
        <SocialButton provider="x" variant="outline" />
      </div>

      <div className="p-4">
        <CardWrapper orderBy="horizontal">
          {products.map((product) => (
            <CardItem key={product.id} {...product} />
          ))}
        </CardWrapper>
      </div>

      <div className="p-4">
        <CartList items={cartItems} />
      </div>
    </div>
  );
}
