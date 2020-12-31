package com.example.demo.exception;

public class ItemNotFoundException  extends  Exception{
    private Integer id;

    public ItemNotFoundException(Long id) {
        super(String.format("item is not found with id : '%s'", id));
    }
}
