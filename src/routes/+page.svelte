<script>
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import { getMessaging, getToken } from 'firebase/messaging';
	import { initializeApp } from 'firebase/app';

	// onMount(async () => {
	// 	const firebaseConfig = {
	// 		apiKey: 'AIzaSyD4RsxaaH5_LRXzptmLRYuzHYbj0X_6ZP8',
	// 		authDomain: 'hisab-52270.firebaseapp.com',
	// 		projectId: 'hisab-52270',
	// 		storageBucket: 'hisab-52270.appspot.com',
	// 		messagingSenderId: '808381302415',
	// 		appId: '1:808381302415:web:11694bad37e110a12092fa',
	// 		measurementId: 'G-69Z6GJ223V'
	// 	};

	// 	// Initialize Firebase
	// 	const app = initializeApp(firebaseConfig);

	// 	// Initialize Firebase Cloud Messaging and get a reference to the service
	// 	const messaging = getMessaging(app);

	// 	const permission = await Notification.requestPermission();
	// 	if (permission === 'granted') {
	// 		const token = await getToken(messaging, {
	// 			vapidKey:
	// 				'BDPFvlMKIVy0u6D7UDXe_q6Dmkd0J88NQ6URTKNgeyh7ujZ0cTppZ3aF2psQpl-M5vHLnQGPDmCxB_eVTrwXJsk'
	// 		});
	// 		console.log(token);
	// 	} else {
	// 		alert('Permission denied');
	// 	}
	// });
</script>

<div class="flex min-h-screen flex-col items-center justify-center border-2 border-black">
	<h1 class="font-mono text-7xl">Hisab</h1>
	<span class="mb-8 pr-10">- Your Expense Buddy</span>
	<a href="/login"><Button>Get Started</Button></a>
</div>
