import './App.css';
import Header from './components/Header/Header';
import Settings from './components/Settings/Settings';
import FAQ from './components/FAQ/FAQ';
import Registration from './components/Registration/Registration';
import Footer from './components/Footer/Footer';
import LineChart from './components/LineChart/LineChart';

function App() {
    const data = [15, 10, 12, 20, 8, 14]
    return (
        <div className="App">
            <Header />
            <Registration />
            <LineChart data={data} />
            <Settings />
            <FAQ />
            <Footer />
        </div>
    );
}

export default App;
