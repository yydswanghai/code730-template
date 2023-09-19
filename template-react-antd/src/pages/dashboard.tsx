import yay from '@/assets/yay.jpg'
import { theme } from 'antd';

export default function HomePage() {
  const { useToken } = theme;
  console.log('主题色:', useToken().token.colorPrimary)
  return (
    <div>
      <h2>dashboard! Welcome to umi!</h2>
      <p>
        <img src={yay} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
    </div>
  );
}
