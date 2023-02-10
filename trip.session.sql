INSERT INTO user (
        id,
        username,
        password_hash,
        email,
        IsAdmin,
        created_at,
        updated_at
    )
VALUES (
        id :integer,
        'username:character varying',
        'password_hash:character varying',
        'email:character varying',
        IsAdmin :boolean,
        'created_at:timestamp with time zone',
        'updated_at:timestamp with time zone'
    );