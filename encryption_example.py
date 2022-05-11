from Crypto.Cipher import AES, PKCS1_OAEP
from Crypto.Util.Padding import pad
from hashlib import sha3_256
from Crypto.PublicKey import RSA
from typing import Tuple
import os

def encrypt(pt: bytes,clientSeed: bytes, serverSeed: bytes)->Tuple[bytes,bytes,bytes,bytes]:
    """Encrypts the data for long-term storage.

    This is an example of how you would encrypt the triples after generating them from a user's query.
    Note that, in the real server, clientSeed would be generated on the client and sent to the server to increase entropy.

    Args:
        pt: the plaintext being encrypted.
        clientSeed: a string of bytes generated randomly by the client.
        serverSeed: a string of bytes generated randomly by the server.
    Returns:
        A tuple containing (in order) the ciphertext, the GMAC, the key, and the nonce used for encryption.
    """
    assert len(clientSeed) == 16 #You don't necessarily need to use 16, this is just an example.
    assert len(serverSeed) == 16
    k = sha3_256(clientSeed + serverSeed).digest()
    key = k[:16]
    nonce = k[16:]
    cipher = AES.new(key,AES.MODE_GCM,nonce=nonce)
    pt = pad(pt,AES.block_size)
    output = cipher.encrypt_and_digest(pt)
    return (output[0], output[1], key, nonce)

def store(filename: str, data: bytes, gmac: bytes, key: bytes, nonce: bytes, client_pubkey: RSA.RsaKey)->None:
    """Stores encyrpted triples in a file.

    This is an exmaple function used to illustrate how you would store the triples after encrypting them.

    Args:
        filename: the name of the file to write to
        data: the encrypted data being written.
        gmac: the gmac obtained when encrypting data.
        key: the AES key used to encrypt data.
        nonce: the nonce used to encrypt data.
        client_pubkey: the client's public key.
    """
    assert client_pubkey.size_in_bits() >= 1024
    assert client_pubkey.size_in_bits() <= 4096
    k = key + nonce
    cipher = PKCS1_OAEP.new(client_pubkey)
    k = cipher.encrypt(k)
    with open(filename,"wb") as f:
        f.write(str(len(data)).encode("utf-8") + b'\n')
        f.write(data)
        f.write(gmac)
        f.write(k)

if __name__ == "__main__":
    #pretend this was generated on the agent and sent to the server.
    client_pkey = RSA.generate(2048).public_key()
    ct = encrypt(
        b'hello, world!', #These would be the triples being stored.
        os.urandom(16), #This would also be generated by the agent and sent with the public key.
        os.urandom(16)
    )
    print(ct)
    store("./output.json",ct[0],ct[1],ct[2],ct[3],client_pkey)