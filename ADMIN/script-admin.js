document.addEventListener('DOMContentLoaded', function() {
    const itemSelector = document.getElementById('itemSelector');
    if (!itemSelector) return; // Pastikan ini halaman admin

    loadSelectedItem('item1');

    // Event listeners
    itemSelector.addEventListener('change', function() {
        loadSelectedItem(this.value);
        resetImagePreview();
    });

    document.getElementById('itemImageUpload').addEventListener('change', function(e) {
        previewImage(e.target.files[0]);
    });

    document.getElementById('itemName').addEventListener('input', updatePreview);
    document.getElementById('itemDescription').addEventListener('input', updatePreview);
    document.getElementById('itemPrice').addEventListener('input', updatePreview);

    document.querySelector('.admin-btn.btn-primary').addEventListener('click', updateItem);
    document.querySelector('.admin-btn.btn-secondary').addEventListener('click', () => {
        loadSelectedItem(itemSelector.value);
        resetImagePreview();
    });
});

function loadSelectedItem(itemId) {
    const item = currentItemData[itemId];
    if (!item) return;
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemDescription').value = item.description;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('previewImage').src = item.image;
    updatePreview();
}

function previewImage(file) {
    const preview = document.getElementById('imagePreview');
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        currentItemData[document.getElementById('itemSelector').value].tempImage = e.target.result;
        updatePreview();
    };
    reader.readAsDataURL(file);
}

function resetImagePreview() {
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = '';
    document.getElementById('itemImageUpload').value = '';
    const selectedItem = document.getElementById('itemSelector').value;
    const item = currentItemData[selectedItem];
    if (item && item.image) {
        document.getElementById('previewImage').src = item.image;
    }
}

function updatePreview() {
    const selectedItem = document.getElementById('itemSelector').value;
    const item = currentItemData[selectedItem];
    const nameInput = document.getElementById('itemName').value;
    const descInput = document.getElementById('itemDescription').value;
    const priceInput = document.getElementById('itemPrice').value;

    document.getElementById('previewName').textContent = nameInput || item.name;
    document.getElementById('previewDescription').textContent = descInput || item.description;
    document.getElementById('previewPrice').textContent = priceInput || item.price;

    if (item.tempImage) {
        document.getElementById('previewImage').src = item.tempImage;
    }
}

function updateItem() {
    const selectedItem = document.getElementById('itemSelector').value;
    const itemData = currentItemData[selectedItem];

    itemData.name = document.getElementById('itemName').value;
    itemData.description = document.getElementById('itemDescription').value;
    itemData.price = document.getElementById('itemPrice').value;

    if (itemData.tempImage) {
        itemData.image = itemData.tempImage;
        delete itemData.tempImage;
    }

    localStorage.setItem('skyItems', JSON.stringify(currentItemData));
    alert('Perubahan berhasil disimpan!');
    updatePreview();
}