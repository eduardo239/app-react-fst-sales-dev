import { useState } from 'react';
import ButtonInput from '../components/ButtonInput';
import FormWrapper from '../components/FormWrapper';
import InputField from '../components/InputField';
import TextHeader1 from '../components/TextHeader1';
import SocialButton from '../components/SocialButton';
import Separator from '../components/Separator';

export default function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  return (
    <div className="p-4">
      {JSON.stringify(form)}
      <FormWrapper>
        <TextHeader1 title="Login" subtitle="Access your account" />
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
        <ButtonInput>Submit</ButtonInput>
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
