// ... інші імпорти ...

function SigninPage() {
    const { user } = React.useContext(AuthContext);
  
    // Перевіряємо, чи користувач підтверджений, якщо ні - перенаправляємо на /signup-confirm
    React.useEffect(() => {
      if (user && !user.confirm) {
        navigate('/signup-confirm'); // Передбачає, що ви використовуєте react-router-dom
      }
    }, [user]);
  
    // Додайте решту коду для сторінки входу в акаунт
  
    return (
      <div>
        <h1>Сторінка входу в акаунт</h1>
        {/* Додайте компоненти для входу, наприклад, форму входу */}
      </div>
    );
  }
  
  function App() {
    return (
      <AuthContext.Provider value={authContextData}>
        <BrowserRouter>
          <Routes>
            {/* ... інші маршрути ... */}
            <Route
              path="/signin"
              element={
                <AuthRoute>
                  <SigninPage />
                </AuthRoute>
              } 
            />
            {/* ... інші маршрути ... */}
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
  
  export default App;
  