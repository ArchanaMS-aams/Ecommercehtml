$(document).ready(function(){
    var cart = [];
    function updateCart() {
        var cartItems = $('#cart-items');
        var cartTotal = $('#cart-total');
        var total = 0;
        cartItems.empty();
        cart.forEach(function(item) {
            var li = $('<li>').text(item.name + ' - $' + item.price);
            var removeButton = $('<button>').text('Remove').addClass('remove-from-cart').data('id', item.id);
            li.append(removeButton);
            cartItems.append(li);
            total += parseFloat(item.price);
        });
        cartTotal.text('Total: $' + total.toFixed(2));
    }
    $('#product-list').on('click', '.add-to-cart', function() {
        var product = $(this).closest('li');
        var item = {
            id: product.data('id'),
            name: product.data('name'),
            price: product.data('price')
        };
        var existingItem = cart.find(function(cartItem) {
            return cartItem.id === item.id;
        });

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            item.quantity = 1;
            cart.push(item);
        }
        updateCart();
    });
    $('#cart-items').on('click', '.remove-from-cart', function() {
        var itemId = $(this).data('id');
        cart = cart.filter(function(item) {
            return item.id !== itemId;
        });

        // Update the cart and display total
        updateCart();
    });
});


