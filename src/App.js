import styles from './App.module.scss';
import RoleRoutes from './rbac/RoleRoutes';
import { InvoiceProvider } from './context/InvoiceContext';

function App() {
  return (
    <InvoiceProvider>
      <div className={styles.app}>
        <RoleRoutes />
      </div>
    </InvoiceProvider>
  );
}

export default App;
