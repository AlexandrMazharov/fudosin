package com.example.demo.exception;

public class ItemNotFoundException  extends  Exception{
    private Integer id;

    public ItemNotFoundException(Long id) {
        super(String.format("item is not found with id : '%s'", id));
    }
    public ItemNotFoundException(String email) {
        super(String.format("item is not found with email : '%s'", email));
    }
}
