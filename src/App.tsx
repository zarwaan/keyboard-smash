import './App.css'
import '@/themes/themes.css'
import ContentLayout from '@/components/MainContent/ContentLayout'
import BackgroundBlur from './components/Utils/BackgroundBlur'

function App() {
	return (
		<>
			<AppContent />
		</>
	)
}

function AppContent() {
	return (
		<>
		<ContentLayout />
		<BackgroundBlur />
		</>
	)
}

export default App