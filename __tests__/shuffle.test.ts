import shuffle, { findPossibleMoves, isCompleted, isInBottomRow, isInLeftmostColumn, isInRightmostColumn, isInTopRow, switchCells } from "@/utils/shuffle";

describe('shuffle', () => {
  describe('isInTopRow', () => {
    describe('first item', () => {
      const idx = 0;

      it('should return true if there is 1 column', () => {
        const numColumns = 1;
        expect(isInTopRow(idx, numColumns)).toBe(true);
      });
  
      it('should return true if there are 2 columns', () => {
        const numColumns = 2;
        expect(isInTopRow(idx, numColumns)).toBe(true);
      });
  
      it('should return true if there are 3 columns', () => {
        const numColumns = 3;
        expect(isInTopRow(idx, numColumns)).toBe(true);
      });
    });

    describe('second item', () => {
      const idx = 1;

      it('should return false if there is only 1 column', () => {
        const numColumns = 1;
        expect(isInTopRow(idx, numColumns)).toBe(false);
      });
  
      it('should return true if there are 2 columns', () => {
        const numColumns = 2;
        expect(isInTopRow(idx, numColumns)).toBe(true);
      });

      it('should return true if there are 3 columns', () => {
        const numColumns = 3;
        expect(isInTopRow(idx, numColumns)).toBe(true);
      });
    });

    describe('third item', () => {
      const idx = 2;

      it('should return false if there is only 1 column', () => {
        const numColumns = 1;
        expect(isInTopRow(idx, numColumns)).toBe(false);
      });
  
      it('should return false if there are 2 columns', () => {
        const numColumns = 2;
        expect(isInTopRow(idx, numColumns)).toBe(false);
      });

      it('should return true if there are 3 columns', () => {
        const numColumns = 3;
        expect(isInTopRow(idx, numColumns)).toBe(true);
      });
    });
  });

  describe('isInLeftmostColumn', () => {
    describe('first item', () => {
      const idx = 0;

      it('should return true if there is 1 column', () => {
        const numColumns = 1;
        expect(isInLeftmostColumn(idx, numColumns)).toBe(true);
      });
  
      it('should return true if there are 2 columns', () => {
        const numColumns = 2;
        expect(isInLeftmostColumn(idx, numColumns)).toBe(true);
      });

      it('should return true if there are 3 columns', () => {
        const numColumns = 3;
        expect(isInLeftmostColumn(idx, numColumns)).toBe(true);
      });
    });

    describe('second item', () => {
      const idx = 1;

      it('should return true if there is only 1 column', () => {
        const numColumns = 1;
        expect(isInLeftmostColumn(idx, numColumns)).toBe(true);
      });
  
      it('should return false if there are 2 columns', () => {
        const numColumns = 2;
        expect(isInLeftmostColumn(idx, numColumns)).toBe(false);
      });

      it('should return false if there are 3 columns', () => {
        const numColumns = 3;
        expect(isInLeftmostColumn(idx, numColumns)).toBe(false);
      });
    });

    describe('third item', () => {
      const idx = 2;

      it('should return true if there is only 1 column', () => {
        const numColumns = 1;
        expect(isInLeftmostColumn(idx, numColumns)).toBe(true);
      });
  
      it('should return true if there are 2 columns', () => {
        const numColumns = 2;
        expect(isInLeftmostColumn(idx, numColumns)).toBe(true);
      });

      it('should return false if there are 3 columns', () => {
        const numColumns = 3;
        expect(isInLeftmostColumn(idx, numColumns)).toBe(false);
      });
    });

    describe('fourth item', () => {
      const idx = 3;

      it('should return true if there is only 1 column', () => {
        const numColumns = 1;
        expect(isInLeftmostColumn(idx, numColumns)).toBe(true);
      });
  
      it('should return false if there are 2 columns', () => {
        const numColumns = 2;
        expect(isInLeftmostColumn(idx, numColumns)).toBe(false);
      });

      it('should return true if there are 3 columns', () => {
        const numColumns = 3;
        expect(isInLeftmostColumn(idx, numColumns)).toBe(true);
      });
    });
  });

  describe('isInRightmostColumn', () => {
    describe('first item', () => {
      const idx = 0;

      it('should return true if there is only 1 column', () => {
        const numColumns = 1;
        expect(isInRightmostColumn(idx, numColumns)).toBe(true);
      });

      it('should return false if there are two columns', () => {
        const numColumns = 2;
        expect(isInRightmostColumn(idx, numColumns)).toBe(false);
      });

      it('should return false if there are 3 columns', () => {
        const numColumns = 3;
        expect(isInRightmostColumn(idx, numColumns)).toBe(false);
      });
    });

    describe('second item', () => {
      const idx = 1;

      it('should return true if there is only 1 column', () => {
        const numColumns = 1;
        expect(isInRightmostColumn(idx, numColumns)).toBe(true);
      });

      it('should return true if there are 2 columns', () => {
        const numColumns = 2;
        expect(isInRightmostColumn(idx, numColumns)).toBe(true);
      });

      it('should return false if there are 3 columns', () => {
        const numColumns = 3;
        expect(isInRightmostColumn(idx, numColumns)).toBe(false);
      });
    });

    describe('third item', () => {
      const idx = 2;

      it('should return true if there is only 1 column', () => {
        const numColumns = 1;
        expect(isInRightmostColumn(idx, numColumns)).toBe(true);
      });

      it('should return false if there are 2 columns', () => {
        const numColumns = 2;
        expect(isInRightmostColumn(idx, numColumns)).toBe(false);
      });

      it('should return true if there are 3 columns', () => {
        const numColumns = 3;
        expect(isInRightmostColumn(idx, numColumns)).toBe(true);
      });
    });
  });

  describe('isInBottomRow', () => {
    describe('first item', () => {
      const idx = 0;

      describe('one column', () => {
        const numColumns = 1;

        it('should return true if there is only 1 item', () => {
          const totalItems = 1;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(true);
        });
  
        it('should return false if there are 2 items', () => {
          const totalItems = 2;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(false);
        });

        it('should return false if there are 3 items', () => {
          const totalItems = 3;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(false);
        });
      });

      describe('two columns', () => {
        const numColumns = 2;

        it('should return true if there are only 2 items', () => {
          const totalItems = 2;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(true);
        });
  
        it('should return false if there are 3 items', () => {
          const totalItems = 4;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(false);
        });

        it('should return false if there are 4 items', () => {
          const totalItems = 4;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(false);
        });
      });

      describe('three columns', () => {
        const numColumns = 3;
        
        it('should return true if there are only 3 items', () => {
          const totalItems = 3;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(true);
        });
  
        it('should return false if there are 6 items', () => {
          const totalItems = 6;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(false);
        });
      });
    });

    describe('second item', () => {
      const idx = 1;

      describe('one column', () => {
        const numColumns = 1;
        it('should return true if there are only 2 items', () => {
          const totalItems = 2;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(true);
        });

        it('should return false if there are 4 items', () => {
          const totalItems = 4;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(false);
        });

        it('should return false if there are 6 items', () => {
          const totalItems = 6;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(false);
        });
      });

      describe('two columns', () => {
        const numColumns = 2;

        it('should return true if there are only 2 items', () => {
          const totalItems = 2;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(true);
        });

        it('should return false if there are 4 items', () => {
          const totalItems = 4;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(false);
        });

        it('should return false if there are 6 items', () => {
          const totalItems = 6;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(false);
        });
      });

      describe('three columns', () => {
        const numColumns = 3;

        it('should return true if there are only 3 items', () => {
          const totalItems = 3;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(true);
        });

        it('should return false if there are 6 items', () => {
          const totalItems = 6;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(false);
        });

        it('should return false if there are 9 items', () => {
          const totalItems = 9;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(false);
        });
      });
    });

    describe('third item', () => {
      const idx = 2;
      
      describe('one column', () => {
        const numColumns = 1;

        it('should return true if there are only 3 items', () => {
          const totalItems = 3;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(true);
        });

        it('should return false if there are 6 items', () => {
          const totalItems = 6;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(false);
        });

        it('should return false if there are 9 items', () => {
          const totalItems = 9;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(false);
        });
      });

      describe('two columns', () => {
        const numColumns = 2;

        it('should return true if there are only 4 items', () => {
          const totalItems = 4;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(true);
        });

        it('should return false if there are 6 items', () => {
          const totalItems = 6;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(false);
        });

        it('should return false if there are 8 items', () => {
          const totalItems = 8;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(false);
        });
      });

      describe('three columns', () => {
        const numColumns = 3;

        it('should return true if there are only 3 items', () => {
          const totalItems = 3;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(true);
        });

        it('should return false if there are 6 items', () => {
          const totalItems = 6;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(false);
        });

        it('should return false if there are 9 items', () => {
          const totalItems = 9;
          expect(isInBottomRow(totalItems, idx, numColumns)).toBe(false);
        });
      });
    });
  });

  describe('switchCells', () => {
    describe('2x2', () => {
      const array = [
        { src: 'image-0-0.png', alt: "1" },
        { src: 'image-0-1.png', alt: "2" },
        { src: 'image-0-2.png', alt: '3' }
      ];
      
      it('should switchCells with the second item', () => {
        const shuffled = switchCells(array, 2, 1);
        const expected = ['image-0-0.png', '', 'image-0-2.png', 'image-0-1.png'];
        expect(shuffled).toEqual(expected);
      });
    });
  });

  describe('isCompleted', () => {
    it('should return true if all images are in their correct positions, 3x2', () => {
      const array = ['image-0-0.png', 'image-1-0.png', 'image-2-0.png',
                     'image-0-1.png', 'image-1-1.png', ''];
      expect(isCompleted(array, 3)).toBe(true);
    });

    it('should return true if all images are in their correct positions, 3x3', () => {
      const array = ['image-0-0.png', 'image-1-0.png', 'image-2-0.png',
                     'image-0-1.png', 'image-1-1.png', 'image-2-1.png',
                     'image-0-2.png', 'image-1-2.png', ''];
      expect(isCompleted(array, 3)).toBe(true);
    });

    it('should return true if not all images are in their correct positions, 3x4', () => {
      const array = ['image-0-0.png', 'image-1-0.png', 'image-2-0.png',
                     'image-0-1.png', 'image-1-1.png', 'image-2-1.png',
                     'image-0-2.png', 'image-1-2.png', 'image-2-2.png',
                     'image-0-3.png', 'image-1-3.png', ''];
      expect(isCompleted(array, 3)).toBe(true);
    })
  });

  describe('findPossibleMoves', () => {
    describe('in 2x2', () => {
      it('0', () => {
        let array = ['', 'image-0-0.png', 'image-0-1.png', 'image-0-2.png'];
        let possibleMoves = findPossibleMoves(array, 2);
        expect(possibleMoves).toEqual([1, 2]);
      });

      it('1', () => {
        let array = ['image-0-0.png', '', 'image-0-1.png', 'image-0-2.png'];
        let possibleMoves = findPossibleMoves(array, 2);
        expect(possibleMoves).toEqual([0, 3]);
      });

      it('2', () => {
        let array = ['image-0-0.png', 'image-0-1.png', '', 'image-0-2.png'];
        let possibleMoves = findPossibleMoves(array, 2);
        expect(possibleMoves).toEqual([0, 3]);
      });

      it('3', () => {
        let array = ['image-0-0.png', 'image-0-1.png', 'image-0-2.png', ''];
        let possibleMoves = findPossibleMoves(array, 2);
        expect(possibleMoves).toEqual([1, 2]);
      });
    });

    describe('in 3x2', () => {
      it('0', () => {
        let array = ['', 'image-0-0.png', 'image-0-1.png', 'image-0-2.png', 'image-0-3.png', 'image-0-4.png'];
        let possibleMoves = findPossibleMoves(array, 3);
        expect(possibleMoves).toEqual([1, 3]);
      });

      it('1', () => {
        let array = ['image-0-0.png', '', 'image-0-1.png', 'image-0-2.png', 'image-0-3.png', 'image-0-4.png'];
        let possibleMoves = findPossibleMoves(array, 3);
        expect(possibleMoves).toEqual([0, 2, 4]);
      });

      it('2', () => {
        let array = ['image-0-0.png', 'image-0-1.png', '', 'image-0-2.png', 'image-0-3.png', 'image-0-4.png'];
        let possibleMoves = findPossibleMoves(array, 3);
        expect(possibleMoves).toEqual([1, 5]);
      });

      it('3', () => {
        let array = ['image-0-0.png', 'image-0-1.png', 'image-0-2.png', '', 'image-0-3.png', 'image-0-4.png'];
        let possibleMoves = findPossibleMoves(array, 3);
        expect(possibleMoves).toEqual([0, 4]);
      });

      it('4', () => {
        let array = ['image-0-0.png', 'image-0-1.png', 'image-0-2.png', 'image-0-3.png', '', 'image-0-4.png'];
        let possibleMoves = findPossibleMoves(array, 3);
        expect(possibleMoves).toEqual([1, 3, 5]);
      });

      it('5', () => {
        let array = ['image-0-0.png', 'image-0-1.png', 'image-0-2.png', 'image-0-3.png', 'image-0-4.png', ''];
        let possibleMoves = findPossibleMoves(array, 3);
        expect(possibleMoves).toEqual([2, 4]);
      });
    });

    describe('in 3x3', () => {
      it('0', () => {
        let array = ['', 'image-0-0.png', 'image-0-1.png', 'image-0-2.png', 'image-0-3.png', 'image-0-4.png', 'image-0-5.png', 'image-0-6.png', 'image-0-7.png'];
        let possibleMoves = findPossibleMoves(array, 3);
        expect(possibleMoves).toEqual([1, 3]);
      });

      it('1', () => {
        let array = ['image-0-0.png', '', 'image-0-1.png', 'image-0-2.png', 'image-0-3.png', 'image-0-4.png', 'image-0-5.png', 'image-0-6.png', 'image-0-7.png'];
        let possibleMoves = findPossibleMoves(array, 3);
        expect(possibleMoves).toEqual([0, 2, 4]);
      });

      it('2', () => {
        let array = ['image-0-0.png', 'image-0-1.png', '', 'image-0-2.png', 'image-0-3.png', 'image-0-4.png', 'image-0-5.png', 'image-0-6.png', 'image-0-7.png'];
        let possibleMoves = findPossibleMoves(array, 3);
        expect(possibleMoves).toEqual([1, 5]);
      });

      it('3', () => {
        let array = ['image-0-0.png', 'image-0-1.png', 'image-0-2.png', '', 'image-0-3.png', 'image-0-4.png', 'image-0-5.png', 'image-0-6.png', 'image-0-7.png'];
        let possibleMoves = findPossibleMoves(array, 3);
        expect(possibleMoves).toEqual([0, 4, 6]);
      });

      it('4', () => {
        let array = ['image-0-0.png', 'image-0-1.png', 'image-0-2.png', 'image-0-3.png', '', 'image-0-4.png', 'image-0-5.png', 'image-0-6.png', 'image-0-7.png'];
        let possibleMoves = findPossibleMoves(array, 3);
        expect(possibleMoves).toEqual([1, 3, 5, 7]);
      });

      it('5', () => {
        let array = ['image-0-0.png', 'image-0-1.png', 'image-0-2.png', 'image-0-3.png', 'image-0-4.png', '', 'image-0-5.png', 'image-0-6.png', 'image-0-7.png'];
        let possibleMoves = findPossibleMoves(array, 3);
        expect(possibleMoves).toEqual([2, 4, 8]);
      });

      it('6', () => {
        let array = ['image-0-0.png', 'image-0-1.png', 'image-0-2.png', 'image-0-3.png', 'image-0-4.png', 'image-0-5.png', '', 'image-0-6.png', 'image-0-7.png'];
        let possibleMoves = findPossibleMoves(array, 3);
        expect(possibleMoves).toEqual([3, 7]);
      });

      it('7', () => {
        let array = ['image-0-0.png', 'image-0-1.png', 'image-0-2.png', 'image-0-3.png', 'image-0-4.png', 'image-0-5.png', 'image-0-6.png', '', 'image-0-7.png'];
        let possibleMoves = findPossibleMoves(array, 3);
        expect(possibleMoves).toEqual([4, 6, 8]);
      });

      it('8', () => {
        let array = ['image-0-0.png', 'image-0-1.png', 'image-0-2.png', 'image-0-3.png', 'image-0-4.png', 'image-0-5.png', 'image-0-6.png', 'image-0-7.png', ''];
        let possibleMoves = findPossibleMoves(array, 3);
        expect(possibleMoves).toEqual([5, 7]);
      });
    });
  });

  it('should shuffle an array', () => {
    const array = ['image-0-0.png', 'image-0-1.png', 'image-0-2.png', 'image-0-3.png', 'image-0-4.png', ''];
    const shuffled = shuffle(array, 3);
    expect(shuffled).not.toEqual(array);
  });
});
