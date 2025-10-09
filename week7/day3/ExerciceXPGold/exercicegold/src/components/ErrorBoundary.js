// src/components/ErrorBoundary.js
import React from 'react';
import Modal from './Modal';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  occurError = () => {
    this.setState({ hasError: true });
  };

  closeModal = () => {
    this.setState({ hasError: false, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Modal
          message="Something went wrong!"
          onClose={this.closeModal}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
