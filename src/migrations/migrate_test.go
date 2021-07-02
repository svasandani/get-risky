package main

import (
	"testing"
)

func TestCheckForward(t *testing.T) {
	m := make(map[string]*Node)

	m["a"] = &Node{
		id:     "a",
		nextId: "b",
	}
	m["TAIL"] = &Node{
		id:     "TAIL",
		nextId: m["a"].id,
		next:   m["a"],
	}

	m["b"] = &Node{
		id:     "b",
		prevId: "a",
		nextId: "c",
	}

	m["c"] = &Node{
		id:     "c",
		prevId: "b",
		nextId: "d",
	}

	m["d"] = &Node{
		id:     "d",
		prevId: "c",
	}
	m["HEAD"] = &Node{
		id:     "HEAD",
		prevId: m["d"].id,
		prev:   m["d"],
	}

	m["a"].next = m["b"]
	m["b"].next = m["c"]
	m["c"].next = m["d"]

	m["d"].prev = m["c"]
	m["c"].prev = m["b"]
	m["b"].prev = m["a"]

	t.Run("a->d is forward", func(t *testing.T) {
		got := checkForward(m, *m["a"], *m["d"])
		if !got {
			t.Errorf("checkForward(a is current, d is target) = %t, want true", got)
		}
	})
	t.Run("b->c is forward", func(t *testing.T) {
		got := checkForward(m, *m["b"], *m["c"])
		if !got {
			t.Errorf("checkForward(b is current, c is target) = %t, want true", got)
		}
	})
	t.Run("d->a is backward", func(t *testing.T) {
		got := checkForward(m, *m["d"], *m["a"])
		if got {
			t.Errorf("checkForward(d is current, a is target) = %t, want false", got)
		}
	})
	t.Run("c->b is backward", func(t *testing.T) {
		got := checkForward(m, *m["c"], *m["b"])
		if got {
			t.Errorf("checkForward(c is current, b is target) = %t, want false", got)
		}
	})
}

func TestBuildList(t *testing.T) {
	m := make(map[string]*Node)

	m["a"] = &Node{
		id:     "a",
		nextId: "b",
	}
	m["TAIL"] = &Node{
		id:     "TAIL",
		nextId: m["a"].id,
		next:   m["a"],
	}

	m["b"] = &Node{
		id:     "b",
		prevId: "a",
		nextId: "c",
	}

	m["c"] = &Node{
		id:     "c",
		prevId: "b",
		nextId: "d",
	}

	m["d"] = &Node{
		id:     "d",
		prevId: "c",
	}

	buildList(m)

	t.Run("d is HEAD.prev", func(t *testing.T) {
		got := m["HEAD"].prev.id
		if got != m["d"].id {
			t.Errorf("HEAD.prev.id = %s, want d", got)
		}
	})
	t.Run("a is TAIL.next", func(t *testing.T) {
		got := m["TAIL"].next.id
		if got != m["a"].id {
			t.Errorf("TAIL.next.id = %s, want a", got)
		}
	})
	t.Run("b is a.next", func(t *testing.T) {
		got := m["a"].next.id
		if got != m["b"].id {
			t.Errorf("a.next.id = %s, want b", got)
		}
	})
	t.Run("c is d.prev", func(t *testing.T) {
		got := m["d"].prev.id
		if got != m["c"].id {
			t.Errorf("d.prev.id = %s, want c", got)
		}
	})

	n := make(map[string]*Node)

	e := &Node{
		id: "",
	}

	m["TAIL"] = &Node{
		id:     "TAIL",
		nextId: e.id,
		next:   e,
	}

	buildList(n)

	t.Run("empty map has nil HEAD", func(t *testing.T) {
		got := n["HEAD"]
		if got != nil {
			t.Errorf("HEAD = %+v, want nil", got)
		}
	})
}
