import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Mettez à jour l'état pour que le prochain rendu affiche l'interface de repli.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Vous pouvez également enregistrer l'erreur dans un service de reporting d'erreurs
    console.error("Caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Vous pouvez afficher n'importe quelle interface de repli
      return <h1>Quelque chose s'est mal passé.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
