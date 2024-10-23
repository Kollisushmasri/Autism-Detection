// Autism centers data
const autismCenters = [
    {
        name: "GEMS (Global Education & Management Solutions)",
        address: "# 21-2-63, 2nd Floor, Tadepalli, Vijayawada, Andhra Pradesh 520001",
        location: { lat: 16.5061, lng: 80.6450 } // Coordinates for the map
    },
    {
        name: "Care and Compassion",
        address: "Opposite Kanaka Durga Temple, Krishnalanka, Vijayawada, Andhra Pradesh 520013",
        location: { lat: 16.5100, lng: 80.6260 }
    },
    {
        name: "Sankalp Special School",
        address: "37-1-31, Shivalayam Street, New R.T.C. Colony, Vijayawada, Andhra Pradesh 520008",
        location: { lat: 16.5186, lng: 80.6352 }
    },
    {
        name: "Aasara Foundation",
        address: "8-2-201, 1st Floor, Prakash Nagar, Vijayawada, Andhra Pradesh 520010",
        location: { lat: 16.5153, lng: 80.6347 }
    },
    {
        name: "Shraddha Foundation",
        address: "2nd Floor, Above Canara Bank, Kothapet, Vijayawada, Andhra Pradesh 520001",
        location: { lat: 16.5077, lng: 80.6411 }
    }
];

// Initialize the map
let map;
function initMap() {
    map = new google.maps.Map(document.getElementById("map-container"), {
        center: { lat: 16.5061, lng: 80.6450 }, // Default center (Vijayawada)
        zoom: 12,
    });
}

// Handle Sign In
document.getElementById('submit-sign-in').addEventListener('click', () => {
    const username = document.getElementById('sign-in-username').value;
    const password = document.getElementById('sign-in-password').value;
    
    // You can implement actual sign-in logic here
    document.getElementById('message-area').textContent = `${username} successfully logged in.`; // External message display
    document.getElementById('sign-in-form').style.display = 'none'; // Close Sign In form
});

// Handle Sign Up
document.getElementById('submit-sign-up').addEventListener('click', () => {
    const username = document.getElementById('sign-up-username').value;
    const password = document.getElementById('sign-up-password').value;
    const confirmPassword = document.getElementById('sign-up-confirm-password').value;

    if (password === confirmPassword) {
        document.getElementById('message-area').textContent = `Registered successfully as ${username}.`; // External message display
        document.getElementById('sign-up-form').style.display = 'none'; // Close Sign Up form
    } else {
        alert("Passwords do not match!");
    }
});

// Show/hide forms based on button clicks
document.getElementById('sign-in-button').addEventListener('click', () => {
    document.getElementById('sign-in-form').style.display = 'block';
    document.getElementById('sign-up-form').style.display = 'none';
    document.getElementById('message-area').textContent = ''; // Clear previous messages
});

document.getElementById('sign-up-button').addEventListener('click', () => {
    document.getElementById('sign-up-form').style.display = 'block';
    document.getElementById('sign-in-form').style.display = 'none';
    document.getElementById('message-area').textContent = ''; // Clear previous messages
});

// Show search container and map when the link is clicked
document.getElementById('search-autism-centers').addEventListener('click', () => {
    document.getElementById('search-container').style.display = 'block'; // Show search input
    document.getElementById('map-container').style.display = 'block'; // Show the map
    initMap(); // Initialize the map
});

// Handle the search for autism centers
document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('search-input').value.toLowerCase();
    if (city === "vijayawada") {
        const centersList = document.getElementById('centers-ul');
        centersList.innerHTML = ''; // Clear previous results
        autismCenters.forEach(center => {
            const listItem = document.createElement('li');
            listItem.textContent = `${center.name}\nAddress: ${center.address}`;
            centersList.appendChild(listItem);

            // Add marker to the map
            new google.maps.Marker({
                position: center.location,
                map: map,
                title: center.name,
            });
        });
        document.getElementById('centers-list').style.display = 'block'; // Show the list of centers
    } else {
        alert("Please enter 'Vijayawada' to see nearby autism centers.");
    }
});

// Handle the image upload and prediction
document.getElementById('upload-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission
    const fileInput = document.getElementById('file-input');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            // Display the uploaded image
            document.getElementById('preview').src = event.target.result;
            document.getElementById('result').style.display = 'block';

            // Add your prediction logic here
            const probability = Math.random(); // Replace with actual model prediction logic
            document.getElementById('prediction').innerText = probability < 0.5 ? "Prediction: Autistic" : "Prediction: Non-Autistic";
            document.getElementById('probability').innerText = `Probability: ${probability.toFixed(2)}`;
        };

        reader.readAsDataURL(file); // Read the image file
    }
});

// Refresh functionality
document.getElementById('refresh').addEventListener('click', () => {
    window.location.reload(); // Reload the page
});
