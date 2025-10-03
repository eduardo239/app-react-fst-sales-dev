import { useState } from 'react';
import ButtonInput from '../components/ButtonInput';
import FormWrapper from '../components/FormWrapper';
import InputField from '../components/InputField';
import TextHeader1 from '../components/TextHeader1';

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
        <TextHeader1 title="Register" subtitle="Create a new account" />
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
        <ButtonInput>Submit</ButtonInput>
      </FormWrapper>
    </div>
  );
}
