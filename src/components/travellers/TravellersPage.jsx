import "./travellers.css";
import TravellersHero from "./TravellersHero";
import { Component } from "react";

class TravellersErrorBoundary extends Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("[Travellers] render error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] bg-black px-6 py-12 text-white">
          <p className="text-sm text-white/60">Travellers failed to load — check console.</p>
          <pre className="mt-4 whitespace-pre-wrap text-xs text-red-300">{String(this.state.error?.message || this.state.error)}</pre>
          <button onClick={() => this.setState({ hasError: false, error: null })} className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-medium text-black">
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function TravellersPage() {
  return (
    <TravellersErrorBoundary>
      <div className="travellers-root min-h-screen w-full">
        <TravellersHero />
      </div>
    </TravellersErrorBoundary>
  );
}
