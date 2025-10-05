import { useState } from 'react';
import ButtonSubmit from '../components/ButtonSubmit';
import FormWrapper from '../components/FormWrapper';
import InputField from '../components/InputField';
import TextHeader from '../components/TextHeader';
import Separator from '../components/Separator';
import SocialButton from '../components/SocialButton';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  return (
    <div className="p-4">
      {JSON.stringify(form)}
      <FormWrapper>
        <TextHeader value="Register" subtitle="Create a new account" />
        <InputField
          label="Username"
          placeholder="Type here..."
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <InputField
          label="Email"
          placeholder="Type here..."
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Type here..."
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <ButtonSubmit value="Submit" onClick={() => {}} />
      </FormWrapper>
      <Separator label="Or continue with" />
      <div className="w-full max-w-md mx-auto gap-2 flex flex-col flex-wrap justify-center mt-6">
        <SocialButton provider="google" variant="outline" />
        <SocialButton provider="facebook" variant="outline" />
        <SocialButton provider="x" variant="outline" />
      </div>
    </div>
  );
}
