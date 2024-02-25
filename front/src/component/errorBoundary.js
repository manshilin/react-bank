import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Оновити стан, щоб наступний рендер показав запасний UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Ви також можете зареєструвати помилку в службі звіту про помилки
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Ви можете відобразити будь-який власний відповідний UI
      return <h1>Щось пішло не так.</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
