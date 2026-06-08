import './App.css'
import '@/themes/themes.css'
import ContentLayout from '@/components/MainContent/ContentLayout'
import BackgroundBlur from './components/Utils/BackgroundBlur'
import AppProviders from './providers/AppProviders'
import { useUIContext } from './providers/UIProvider'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'

function App() {
	useEffect(() => {
		document.body.classList.add('theme-transition');
	});
	return (
		<AppProviders>
			<AppContent />
		</AppProviders>
	)
}

function AppContent() {
	const uictx = useUIContext();
	return (
		<>
			<ContentLayout />
			<AnimatePresence>
				{uictx.isSettingsOpen && <BackgroundBlur />}
			</AnimatePresence>
		</>
	)
}

export default App