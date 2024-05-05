// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/** @title MockCats.
 * @notice It is a mock contract to simulate
 * a new NFT token in tests.
 */
contract MockCats is ERC721, Ownable {
    using Counters for Counters.Counter;

    // Used for generating the tokenId of new NFT minted
    Counters.Counter private _tokenIds;

    constructor() public ERC721("Mock Cats", "MC") {
        _setBaseURI("test/");
    }

    /**
     * @notice Mint NFTs to caller. Anyone can call it.
     */
    function mint() external returns (uint256) {
        uint256 newId = _tokenIds.current();
        _tokenIds.increment();
        _mint(address(msg.sender), newId);
        _setTokenURI(newId, "default");
        return newId;
    }
}
